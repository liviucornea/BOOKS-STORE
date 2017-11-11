package com.scotiabank.voice.bio.controllers;

import com.scotiabank.voice.bio.GetPropertiesSettings;
import com.scotiabank.voice.bio.data.*;
import com.scotiabank.voice.bio.data.as400.EnrollmentErrorDTO;
import com.scotiabank.voice.bio.data.as400.VerificationErrorDTO;
import com.scotiabank.voice.bio.data.cams.CamsServiceSpeakerOutputDTO;
import com.scotiabank.voice.bio.data.license.LicenceInputData;
import com.scotiabank.voice.bio.data.notifications.NotificationInputDTO;
import com.scotiabank.voice.bio.data.notifications.VerifyResponseDTO;
import com.scotiabank.voice.bio.data.nuance.SpeakerStatusForAs400DTO;
import com.scotiabank.voice.bio.data.nuance.SpeakerStatusResponseDTO;
import com.scotiabank.voice.bio.delegate.*;
import com.scotiabank.voice.bio.model.VoiceBioSession;
import com.scotiabank.voice.bio.repositories.VoiceBioSessionRepository;
import net.minidev.json.JSONObject;
import org.apache.logging.log4j.util.Strings;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.ws.rs.core.Response;
import java.io.IOException;


/**
 * Created by LCornea on 4/21/2017.
 */
//
//@EnableJpaRepositories("com.scotiabank.voice.bio.repositories")
@RestController
@Controller
@EnableJpaRepositories(basePackages = "com.scotiabank.voice.bio.repositories")
public class VoiceBioController extends BaseController {

    final Logger logger = LoggerFactory.getLogger(VoiceBioController.class);
    private GetPropertiesSettings properties = GetPropertiesSettings.instance();


    @Autowired
    private VoiceBioSessionRepository voiceBioRepo;
    @Autowired
    private CallBackDelegate callBackDelegate;
    @Autowired
    private CamsDelegate camsDelegate;
    @Autowired
    private NuanceDelegate nuanceDelegate;
    @Autowired
    private As400Delegate as400Delegate;
    @Autowired
    private LicenceDelegate licenceDelegate;

    @RequestMapping(value = "/getSpeakerId", method = RequestMethod.POST)
    @ResponseBody
    public String getSpeakerId(@RequestBody String request) {
        String speakerId = properties.defaultSpeackerId;
        String errorMessage;
        logger.warn("Voice Bio Controller: Method getSpeakerId invoked by AS400 with input: " + request);
        try {
            String camsUrl = properties.camsGetUserByCidUrl;
            logger.warn("Voice Bio Controller: Getting CidInputData object from request body!");
            CidInputData data = (CidInputData) fromJson(CidInputData.class, request);
            //speakerId = camsDelegate.getSpeakerId(data).getSpeakerID();
            CamsServiceSpeakerOutputDTO speakerObjFromCams = camsDelegate.getSpeakerId(data);
            speakerId = speakerObjFromCams.getSpeakerID();
            if (speakerId.equals(properties.defaultSpeackerId)) {
                logger.error("Voice Bio Controller: Unable to obtain valid Speaker Id from CAMS");
                logger.warn("Sending error to AS4oo");
                EnrollmentErrorDTO errorToAs400 = new EnrollmentErrorDTO();
                errorToAs400.setCid(data.getCid());
                errorToAs400.setAgentExtension(data.getAgentExtension());
                errorToAs400.setErrMsg("SVB received error msg from CAMS: " + speakerObjFromCams.getErrorMsg());
                this.as400Delegate.sendErrorMessage(toJson(errorToAs400));
                return properties.defaultSpeackerId;
            }
            logger.warn("Voice Bio Controller: Speaker Id from Cams is obtained and value is: " + speakerId);
            String agentExtension = data.getAgentExtension();
            logger.warn("Voice Bio Controller: Getting call back url by agent extension: " + agentExtension);
            VoiceBioSession callBackData = this.callBackDelegate.getCallBackData(agentExtension, this.voiceBioRepo);

            if (callBackData == null) {
                logger.error("Unable to send speakerID to Nuance. Unknown callbackUrl and token for agent extension: " + agentExtension);
                EnrollmentErrorDTO errorToAs400 = new EnrollmentErrorDTO();
                errorToAs400.setCid(data.getCid());
                errorToAs400.setAgentExtension(data.getAgentExtension());
                errorToAs400.setErrMsg("Unable to send speakerID to Nuance. Unknown callbackUrl and token for agent extension: " + agentExtension);
                this.as400Delegate.sendErrorMessage(toJson(errorToAs400));
                Exception e = new Exception("Unable to send speakerID to Nuance. Unknown callbackUrl and token for agent extension: " + agentExtension);
                throw e;
            }
            String callBackUrl = callBackData.getCallBackUrl();
            String callBackToken = callBackData.getToken();
            logger.warn("Send speaker Id to Nuance");
            SpeakerStatusResponseDTO nuanceStatusResponse = this.nuanceDelegate.setSpeakerId(data, speakerId, callBackToken, callBackUrl);
            logger.warn("Final enrol status: " + nuanceStatusResponse.finalEnrollStatus);
            logger.warn("Response status when Speaker ID is sent to Nuance: " + nuanceStatusResponse.httpStatusCode);
            // lines bellow for testing purpose
            //SpeakerStatusForAs400DTO speakerStatusForAs400Mock = (SpeakerStatusForAs400DTO) this.fromJson(SpeakerStatusForAs400DTO.class, this.mokSpeakerStatus);
            //speakerStatusForAs400Mock.setCid(data.getCid());
            //String sendToAs400Test = this.as400Delegate.setSpeackerId(data, speakerStatusForAs400Mock);

            if (nuanceStatusResponse.finalEnrollStatus != null && Strings.isNotEmpty(nuanceStatusResponse.finalEnrollStatus)) {
                logger.warn("Send speakerId and speakerId Status from Nuance to AS400!");
                // get ready to send to As400 JSON from Nuance, obtained in line bellow
                SpeakerStatusForAs400DTO speakerStatusForAs400 = (SpeakerStatusForAs400DTO) this.fromJson(SpeakerStatusForAs400DTO.class, toJson(nuanceStatusResponse));
                speakerStatusForAs400.setSpeakerId(speakerId);
                speakerStatusForAs400.setCid(data.getCid());
                String sendToAs400 = this.as400Delegate.setSpeackerId(data, speakerStatusForAs400);
                if (sendToAs400.equals("OK")) {
                    logger.warn("Speaker ID is sent to AS400.");
                }
                // send to CAMS set spakerId status
                logger.warn("Send speakerId status to CAMS");
                String notifyCamsStatus = this.camsDelegate.setSpeakerIdStatus(nuanceStatusResponse, speakerId);
                if (!notifyCamsStatus.equals("UPS000")) {
                    logger.error("Invalid status code from CAMS when SVB sends speakerId status. Code is:" + notifyCamsStatus);
                    Exception e = new Exception("Unable to send speakerID status to CAMS. Code is: " + notifyCamsStatus);
                    throw e;
                }
            } else {
                logger.error("Final enroll status from nuance is null or empty");
                logger.error("VoiceBioController, SpeakerId status is not sent neither to AS400 nor to CAMS!");
                logger.error("Error response from Nuance when SVB sends speaker ID (" + speakerId + "):" + nuanceStatusResponse.errorData.errorDetails.errorMessage);
                logger.warn("Sending error message to As400");
                EnrollmentErrorDTO errorToAs400 = new EnrollmentErrorDTO();
                errorToAs400.setCid(data.getCid());
                errorToAs400.setAgentExtension(data.getAgentExtension());
                errorToAs400.setErrMsg("SVB received error message from Nuance: " + nuanceStatusResponse.errorData.errorDetails.errorMessage);
                this.as400Delegate.sendErrorMessage(toJson(errorToAs400));
            }
        } catch (Exception e) {
            logger.error("VoiceBioController - ERROR:  web method name - getSpeakerId: " + e.toString());
            return speakerId;
        }
        return speakerId;
    }

    @RequestMapping(value = "/setcallback", method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity<?> setcallback(@RequestBody String request) {
        logger.warn("Set call back method invoked! Input JSON is:" + request);
        JSONObject responseJSON = new JSONObject();

        try {
            // String propValues = properties.getPropValues();
            logger.warn("Get object CallBackInputData from JSON!");
            CallBackInputData data = (CallBackInputData) fromJsonForcedProperties(CallBackInputData.class, request);
            logger.warn("CallBackInputData from JSON! obtained ");
            this.callBackDelegate.setCallBackData(data, this.voiceBioRepo);
            logger.warn("CallBackInputData is saved !");
            responseJSON.put("status", "success");
            responseJSON.put("code", Response.Status.OK.getStatusCode());
            responseJSON.put("message", "URL saved!");
            return new ResponseEntity(responseJSON.toJSONString(), HttpStatus.OK);
        } catch (Exception e) {
            logger.error(" Error trying to set call back URL: " + e.toString());
            if (e instanceof IOException) {
                responseJSON.put("status", "ERROR");
                responseJSON.put("message", e.toString());
                responseJSON.put("code", Response.Status.BAD_REQUEST.getStatusCode());
                return new ResponseEntity(responseJSON.toString(), HttpStatus.BAD_REQUEST);
            }
            responseJSON.put("status", "ERROR");
            responseJSON.put("message", e.toString());
            responseJSON.put("code", Response.Status.SERVICE_UNAVAILABLE.getStatusCode());
            logger.error(" Error trying to set call back URL: Service Unavailable!!");
            return new ResponseEntity(responseJSON.toString(), HttpStatus.SERVICE_UNAVAILABLE);
        }
    }

    @RequestMapping(value = "/sendNotification", method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity<?> setnotification(@RequestBody String request) {
        logger.warn("Send notification method invoked! Input JSON is: " + request);
        JSONObject responseJSON = new JSONObject();
        try {
            // String propValues = properties.getPropValues();
            NotificationInputDTO notification = (NotificationInputDTO) fromJson(NotificationInputDTO.class, request);

            if (notification.getEventType().equals("LOGOUT") || notification.getEventArgs() == null) {
                logger.warn("Logout notification received. Nothing to send to Cams or As400");
            } else if (notification.getEventArgs().getSpeakerId() != null) {
                logger.warn("Send notification to AS400.");
                String as400NotifResult = this.as400Delegate.setNotification(notification, request);

                logger.warn("Send notification to CAMS.");
                String notifyCamsStatus = this.camsDelegate.setNotification(notification);
                if (!notifyCamsStatus.equals("UPS000")) {
                    logger.error("Unable to send Notification to CAMS. Code is: " + notifyCamsStatus);
                    Exception e = new Exception("Unable to send Notification to CAMS. Code is: " + notifyCamsStatus);
                    throw e;
                }
            } else {
                logger.warn("Notification of type: " + notification.getEventType() + " received but Speaker ID is null. Nothing to send to CAMS or AS400!");
            }
            responseJSON.put("status", "success");
            responseJSON.put("code", Response.Status.OK.getStatusCode());
            responseJSON.put("message", "Notification is saved!");
            return new ResponseEntity(responseJSON.toJSONString(), HttpStatus.OK);
        } catch (Exception e) {
            logger.error(" Error trying to send notification: " + e.toString());
            if (e instanceof IOException) {
                responseJSON.put("status", "ERROR");
                responseJSON.put("message", e.toString());
                responseJSON.put("code", Response.Status.BAD_REQUEST.getStatusCode());

                return new ResponseEntity(responseJSON.toString(), HttpStatus.BAD_REQUEST);
            }
            responseJSON.put("status", "ERROR");
            responseJSON.put("message", e.toString());
            responseJSON.put("code", Response.Status.SERVICE_UNAVAILABLE.getStatusCode());
            return new ResponseEntity(responseJSON.toString(), HttpStatus.SERVICE_UNAVAILABLE);
        }
    }

    @RequestMapping(value = "/verifySpeakerID", method = RequestMethod.POST)
    @ResponseBody
    public String verifySpeakerId(@RequestBody String request) {
        logger.warn("Verify Speaker ID invoked by AS400 with input: " + request);
        VerificationErrorDTO verifErrorResponse = new VerificationErrorDTO();
        try {
            VerifySpeakerIdInputData data = (VerifySpeakerIdInputData) fromJson(VerifySpeakerIdInputData.class, request);
            String agentExtension = data.getAgentExtension();
            verifErrorResponse.setSpeakerId(data.getSpeakerId());
            verifErrorResponse.setAgentExtension(agentExtension);
            logger.warn("Verify SpeakerID: Getting call back url by agent extension: " + agentExtension);
            VoiceBioSession callBackData = this.callBackDelegate.getCallBackData(agentExtension, this.voiceBioRepo);
            if (callBackData == null) {
                logger.error("Unable to send verification to Nuance. Unknown callbackUrl and token for agent extension: " + agentExtension);
                Exception e = new Exception("Unable to send verification to Nuance. Unknown callbackUrl and token for agent extension: " + agentExtension);
                throw e;
            }
            String callBackUrl = callBackData.getCallBackUrl();
            String callBackToken = callBackData.getToken();
            VerifyResponseDTO verificationResponse = nuanceDelegate.getVeficationForSpeakerId(data, callBackToken, callBackUrl);
            if (verificationResponse.getHttpStatusCode() != 200) {
                verifErrorResponse.setErrMsg(verificationResponse.getErrorData().errorDetails.errorMessage);
                logger.error(toJson(verifErrorResponse));
                return toJson(verifErrorResponse);
            }

            return toJson(verificationResponse);
        } catch (Exception e) {
            logger.error("Error trying to do speaker id Verification for input: " + request);
            verifErrorResponse.setErrMsg(e.getMessage());
            try {
                return toJson(verifErrorResponse);
            } catch (Exception ex) {
                return "Error";
            }
        }

    }

    @RequestMapping(value = "/isAlive", method = RequestMethod.GET)
    @ResponseBody
    public String isAlive() {
        return "Ok";
    }

    @CrossOrigin(origins = "*")
    @RequestMapping(value = "/getLicenceInfo", method = RequestMethod.POST)
    @ResponseBody
    public String getLicenceInfo(@RequestBody String request) {
        try {
            LicenceInputData data = (LicenceInputData) fromJson(LicenceInputData.class, request);
            String forServerUrl = data.getForServerUrl();
            return licenceDelegate.getLicenceInfo(forServerUrl);
        } catch (Exception ex) {
            this.logger.error("Error trying to get licence info. Cause is:" + ex.toString());
            return "{ 'error': '" + ex.toString() + "' }";
        }
    }


}