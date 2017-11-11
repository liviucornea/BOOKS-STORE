package com.scotiabank.voice.bio.delegate;

import com.scotiabank.voice.bio.GetPropertiesSettings;
import com.scotiabank.voice.bio.data.CidInputData;
import com.scotiabank.voice.bio.data.cams.*;

import com.scotiabank.voice.bio.data.notifications.NotificationInputDTO;
import com.scotiabank.voice.bio.data.notifications.NotificationToCams;
import com.scotiabank.voice.bio.data.nuance.SpeakerStatusResponseDTO;
import org.apache.http.HttpResponse;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.HttpClientBuilder;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;

/**
 * Created by LCornea on 5/9/2017.
 */

@Service
public class CamsDelegate extends BaseDelegate {
    private GetPropertiesSettings properties = GetPropertiesSettings.instance();

    public CamsDelegate() {
    }

    public CamsServiceSpeakerOutputDTO getSpeakerId(CidInputData data) throws IOException {
        CamsServiceSpeakerOutputDTO outputDTO = new CamsServiceSpeakerOutputDTO();
        String speackerId = properties.defaultSpeackerId;
        String camsUrl = properties.camsGetUserByCidUrl;
        HttpClient client = HttpClientBuilder.create().build();
        HttpPost post = new HttpPost(camsUrl);
        this.setCamsRequestHeaders(post);
        GetSpeakerIdRequestBodyDTO speakerIdRequestBodyDTO = new GetSpeakerIdRequestBodyDTO();
        speakerIdRequestBodyDTO.setCid(data.getCid());

        String bodyJson = toJson(speakerIdRequestBodyDTO);
        StringEntity requestBody = new StringEntity(bodyJson);
        this.logger.warn("Http post send to CAMS to getSpeakerID, url used: " + camsUrl + " BodyJson: " + bodyJson);
        post.setEntity(requestBody);
        HttpResponse response = client.execute(post);
        if (response.getStatusLine().getStatusCode() != 200) {
            logger.error("HTTP error code when invoke CAMS to get speaker ID is: " + response.getStatusLine().getStatusCode());
            outputDTO.setHasErrors(true);
            outputDTO.setSpeakerID(speackerId);
            outputDTO.setErrorMsg("HTTP error code when invoke CAMS to get speaker ID is: " + response.getStatusLine().getStatusCode());
            return outputDTO;
        }


        this.logger.warn("Http post successfully sent to CAMS, for getSpeakerId");
        StringBuffer result = new StringBuffer();
        String line = "";
        BufferedReader rd = new BufferedReader(
                new InputStreamReader(response.getEntity().getContent()));
        while ((line = rd.readLine()) != null) {
            result.append(line);
        }
        rd.close();
        this.logger.warn("Full response for getSpeakerId: " + result.toString());
        ResponseToCidDTO responseToCidDto = (ResponseToCidDTO) classFromJson(ResponseToCidDTO.class, result.toString());
        String resStatus = responseToCidDto.status.getCode().toUpperCase();
        this.logger.warn("Response status for getSpeakerId from CAMS: " + resStatus);

        if (resStatus.equals("UPS989")) {
            // go and create CAMS id (and will create speaker id too)
            this.logger.warn("Do a preregister for CID: " + data.getCid());
            String camsID = this.preRegisterCID(data);
            if (camsID.equals(properties.defaultSpeackerId)) {
                logger.error("Preregister in CAMS had failed.");
                outputDTO.setHasErrors(true);
                outputDTO.setSpeakerID(properties.defaultSpeackerId);
                outputDTO.setErrorMsg("Preregister in Cams failed.");
                return outputDTO;
            }
            // go back and get speaker id for camsId just created
            // return this.getSpeakerIdById(camsID);
            speackerId = this.getSpeakerIdById(camsID);
            outputDTO.setSpeakerID(speackerId);
            if (speackerId.equals(properties.defaultSpeackerId)) {
                outputDTO.setHasErrors(true);
                outputDTO.setErrorMsg("Error in CAMS when getSpeakerIdById: " + camsID);
            }
            return outputDTO;
        }
        if (resStatus.equals("UPS900")) {
            logger.error("Exception occurred while processing the request for CID=" + data.getCid());
            //return speackerId;
            outputDTO.setHasErrors(true);
            outputDTO.setSpeakerID(speackerId);
            outputDTO.setErrorMsg("CAMS error=UPS900 for CID=" + data.getCid());
            return outputDTO;
        }


        if (resStatus.equals("UPS000")) {
            ArrayList<AppUserDTO> appUsers = responseToCidDto.appUsers;
            if (appUsers != null && appUsers.size() == 1) {
                ArrayList<MembershipDTO> appMembershipList = appUsers.get(0).getAppMembership();
                int appId_CIS = 0;
                for (MembershipDTO membership : appMembershipList) {
                    if (membership.getAppId().toUpperCase().equals("CIS"))
                        appId_CIS++;
                    // return UNDEFINED if one AppUserDTO is present but has more than AppId = 'CIS'
                    // pls note this will return UNDefined if you have speakerID but you have more than
                    // one AppId = 'CIS'
                    if (appId_CIS >= 2) {
                        logger.error("Error in CAMS service for getSpeakerId");
                        logger.error("More than one AppId='CIS' identified for CID = " + data.getCid() + " and Id=" + appUsers.get(0).getId());
                        logger.error("--> " + appId_CIS + " appId=CIS have been found!");
                        // return speackerId;
                        outputDTO.setHasErrors(true);
                        outputDTO.setSpeakerID(speackerId);
                        outputDTO.setErrorMsg("More than one AppId='CIS' identified for CID = " + data.getCid() + " and Id=" + appUsers.get(0).getId());
                        return outputDTO;
                    }
                }
                // return the speakerID if is there and is only one AppId = 'CIS' in app memember ship list
                if (appUsers.get(0).getSpeakerId() != null && appUsers.get(0).getSpeakerId().trim().length() > 0 && appId_CIS == 1) {
                    //return appUsers.get(0).getSpeakerId();
                    speackerId = appUsers.get(0).getSpeakerId();
                    outputDTO.setSpeakerID(speackerId);
                    return outputDTO;

                }
                if (appId_CIS == 1 && (appUsers.get(0).getSpeakerId() == null || appUsers.get(0).getSpeakerId().isEmpty())) {
                    //return this.getSpeakerIdById(appUsers.get(0).getId());
                    speackerId = this.getSpeakerIdById(appUsers.get(0).getId());
                    outputDTO.setSpeakerID(speackerId);
                    if (speackerId == null || speackerId.equals(properties.defaultSpeackerId)) {
                        outputDTO.setHasErrors(true);
                        outputDTO.setSpeakerID(properties.defaultSpeackerId);
                        outputDTO.setErrorMsg("Error in CAMS when invoke getSpeakerIdById, with ID: " + appUsers.get(0).getId() + ". Returned speacker id is null " ) ;
                    }
                    return outputDTO;
                }

            } else {
                // return UNDEFINED if more than one AppUser is present
                if (appUsers.size() > 1) {
                    logger.error("More than one AppUser identified for CID=" + data.getCid());
                    logger.error("--> " + appUsers.size() + " appUsers have been found for that CID");
                    // return speackerId;
                    outputDTO.setHasErrors(true);
                    outputDTO.setSpeakerID(speackerId);
                    outputDTO.setErrorMsg("More than one AppUser identified for CID=" + data.getCid());
                    return outputDTO;
                }
            }
            speackerId = responseToCidDto.appUsers.get(0).getSpeakerId();
        }

        //   return speackerId;
        outputDTO.setSpeakerID(speackerId);
        return outputDTO;
    }

    private String getSpeakerIdById(String id) throws IOException {
        String speakerId = properties.defaultSpeackerId;
        String camsUrl = properties.camsGetSpeakerIdByIdUrl;
        HttpClient client = HttpClientBuilder.create().build();
        HttpPost post = new HttpPost(camsUrl);
        this.setCamsRequestHeaders(post);
        GetSpeakerIdByIdRequestBodyDTO getSpeakerIdByIdRequestBodyDTO = new GetSpeakerIdByIdRequestBodyDTO();
        getSpeakerIdByIdRequestBodyDTO.setId(id);
        String bodyJson = toJson(getSpeakerIdByIdRequestBodyDTO);

        StringEntity requestBody = new StringEntity(bodyJson);
        post.setEntity(requestBody);
        this.logger.warn("Http post send to CAMS for getSpeakerIdById, url used: " + camsUrl + " BodyJson: " + bodyJson);
        HttpResponse response = client.execute(post);
        this.logger.warn("Http post successfully sent to CAMS, for getSpeakerIdById");
        StringBuffer result = new StringBuffer();
        String line = "";
        BufferedReader rd = new BufferedReader(
                new InputStreamReader(response.getEntity().getContent()));
        while ((line = rd.readLine()) != null) {
            result.append(line);
        }
        rd.close();
        this.logger.warn("Full response for getSpeakerIdById: " + result.toString());
        ResponseToCamsIdDTO responseToCamsIdDto = (ResponseToCamsIdDTO) classFromJson(ResponseToCamsIdDTO.class, result.toString());
        if (!responseToCamsIdDto.status.getCode().toUpperCase().equals("UPS000")) {
            logger.error("Error in CAMS when getSpeakerIdById, code is: " + responseToCamsIdDto.status.getCode().toUpperCase());
            return speakerId;
        }
        if ( responseToCamsIdDto.appUser.getSpeakerId() == null ) {
            logger.error("Error in CAMS when invoked endpoint getSpeakerIdById: value returned is null for id = " + id);
        }

        return responseToCamsIdDto.appUser.getSpeakerId();

    }

    private void setCamsRequestHeaders(HttpPost post) {
        post.setHeader(HttpHeaders.CONTENT_TYPE, "application/json");
        post.setHeader("X-UPS-ServiceAccount", properties.userCAMS);
        post.setHeader("X-UPS-Password", properties.passwordCAMS);

    }

    // return a CAMS ID String
    private String preRegisterCID(CidInputData data) throws IOException {
        String newCamsId = properties.defaultSpeackerId;
        String camsUrl = properties.camsPreregisterUrl;
        this.logger.warn("Execeute CAMS Preregiter, using URL: " + camsUrl);
        HttpClient client = HttpClientBuilder.create().build();
        HttpPost post = new HttpPost(camsUrl);
        this.setCamsRequestHeaders(post);
        String bodyJson = this.preRegisterRequestBody(data);
        StringEntity requestBody = new StringEntity(bodyJson);
        post.setEntity(requestBody);
        this.logger.warn("Http post send to CAMS for preRegisterCID, url used: " + camsUrl + " BodyJson: " + bodyJson);
        HttpResponse response = client.execute(post);
        this.logger.warn("Http post successfully sent to CAMS, for preRegisterCID: ");
        StringBuffer result = new StringBuffer();
        String line = "";
        BufferedReader rd = new BufferedReader(
                new InputStreamReader(response.getEntity().getContent()));
        while ((line = rd.readLine()) != null) {
            result.append(line);
        }
        rd.close();
        this.logger.warn("Full response for preRegisterCID" + result.toString());
        ResponseToPreregisterDTO preregisterDTO = (ResponseToPreregisterDTO) classFromJson(ResponseToPreregisterDTO.class, result.toString());

        if (!preregisterDTO.status.getCode().toUpperCase().equals("UPS000")) {
            logger.error("Error in CAMS when preRegisterCID, code is: " + preregisterDTO.status.getCode().toUpperCase());
            return newCamsId;
        }
        return preregisterDTO.appUser.getId();
    }


    private String preRegisterRequestBody(CidInputData data) throws IOException {
        PreRegisterRequestBodyObj preRegister = new PreRegisterRequestBodyObj();
        MembershipDTO membership = new MembershipDTO();
        membership.setChannelUserId(data.getCid());
        membership.setAppId("CIS");
        ArrayList<MembershipDTO> memberList = new ArrayList<MembershipDTO>();
        memberList.add(membership);
        PreregisterAppUser appUser = new PreregisterAppUser();
        appUser.setCid(data.getCid());
        appUser.setFirstName(data.getFirstName());
        appUser.setLastName(data.getLastName());
        appUser.setAppMembership(memberList);
        preRegister.setAppUser(appUser);
        preRegister.setServiceAccount(properties.camsServiceAccount);

        String outputJSON = toJson(preRegister);
        this.logger.warn("Cams preregister Request Body is : " + outputJSON);
        return outputJSON;
    }

    public String updateVBMStatus(NotificationToCams notifToSend) throws IOException {
        String camsUrl = properties.camsUpdateVBMStatusBySpeakerIdUrl;
        HttpClient client = HttpClientBuilder.create().build();
        HttpPost post = new HttpPost(camsUrl);
        this.setCamsRequestHeaders(post);
        String bodyJson = toJson(notifToSend);
        this.logger.warn("CamsUpdateVBMStatusBySpeakerIdUrl used is:" + camsUrl);
        this.logger.warn("UpdateVBMStatus - request body:" + bodyJson);
        StringEntity requestBody = new StringEntity(bodyJson);
        post.setEntity(requestBody);
        HttpResponse response = client.execute(post);
// return erorr code if HTTP response status is different than 200
        if (response.getStatusLine().getStatusCode() != 200) {
            this.logger.error("Error trying to set notification to CAMS. HTTP status Code: " + response.getStatusLine().getStatusCode());
            this.logger.error("The error is for Speaker id = " + notifToSend.getSpeakerId());
            return Integer.toString(response.getStatusLine().getStatusCode());
        }

        StringBuffer result = new StringBuffer();
        String line = "";
        BufferedReader rd = new BufferedReader(
                new InputStreamReader(response.getEntity().getContent()));
        while ((line = rd.readLine()) != null) {
            result.append(line);
        }
        rd.close();

        this.logger.warn("CAMS response for updateVBMStatus is: " + result.toString());
        ResponseToCidDTO responseToCidDto = (ResponseToCidDTO) classFromJson(ResponseToCidDTO.class, result.toString());
        String resStatus = responseToCidDto.status.getCode().toUpperCase();
        if (!resStatus.equals("UPS000")) {
            this.logger.error("Error trying to set notification to CAMS. Status Code: " + resStatus);
            this.logger.error("The error is for Speaker id = " + notifToSend.getSpeakerId());
        }
        return resStatus;
    }

    public String setSpeakerIdStatus(SpeakerStatusResponseDTO nuanceStatusResponse, String speakerId) throws IOException {
        NotificationToCams notifToCAMS = new NotificationToCams();
        notifToCAMS.setSpeakerId(speakerId);
        notifToCAMS.setVbmStatus(nuanceStatusResponse.finalEnrollStatus);
        return this.updateVBMStatus(notifToCAMS);
    }

    public String setNotification(NotificationInputDTO notification) throws IOException {
        NotificationToCams notifToCAMS = new NotificationToCams();
        notifToCAMS.setSpeakerId(notification.getEventArgs().getSpeakerId());
        String vbmStatus = notification.getEventType();
        String eventType = notification.getEventType();
        switch (eventType) {
            case "SUSPICIOUS":
                vbmStatus += " - " + notification.getEventArgs().getReason();
                break;
            case "OPT_OUT":
                vbmStatus += " - " + notification.getEventArgs().getReason();
                break;
            case "ENROLL":
                vbmStatus += " - " + notification.getEventArgs().getEnrollResponse().getFinalEnrollStatus();
                break;
            case "VERIFY":
                vbmStatus += " - " + notification.getEventArgs().getVerifyResponse().getDecision();
                break;

            default:
                vbmStatus = notification.getEventType();
                break;

        }
        // CAMS supports only 100 char for vbmStatus
        notifToCAMS.setVbmStatus(vbmStatus.length() > 100 ? vbmStatus.substring(0, 100) : vbmStatus);
        return this.updateVBMStatus(notifToCAMS);
    }

}
