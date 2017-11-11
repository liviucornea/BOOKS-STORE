package com.scotiabank.voice.bio.delegate;

import com.scotiabank.voice.bio.GetPropertiesSettings;
import com.scotiabank.voice.bio.data.CidInputData;
import com.scotiabank.voice.bio.data.VerifySpeakerIdInputData;
import com.scotiabank.voice.bio.data.notifications.VerifyResponseDTO;
import com.scotiabank.voice.bio.data.nuance.ErrorSpeakerStatusDTO;
import com.scotiabank.voice.bio.data.nuance.RequestBodyForSpeakerIdObj;
import com.scotiabank.voice.bio.data.nuance.SetSpeakerIdInfoDTO;
import com.scotiabank.voice.bio.data.nuance.SpeakerStatusResponseDTO;
import org.apache.http.HttpResponse;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.HttpClientBuilder;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

/**
 * Created by LCornea on 5/12/2017.
 */
@Service
public class NuanceDelegate extends  BaseDelegate {
    private GetPropertiesSettings properties = GetPropertiesSettings.instance();

    public NuanceDelegate(){}

    public VerifyResponseDTO getVeficationForSpeakerId(VerifySpeakerIdInputData inputData,  String callBackToken, String callBackUrl) throws IOException{
        String nuanceVerifySpeakerURL = callBackUrl+ "/speakers/" + inputData.getSpeakerId() + "/verify/result";
        logger.warn("Nuance Verify Speaker Id - URL: " + nuanceVerifySpeakerURL);
        HttpClient client = HttpClientBuilder.create().build();
        HttpGet get = new HttpGet(nuanceVerifySpeakerURL);
        get.setHeader(HttpHeaders.CONTENT_TYPE, "application/json");
        get.setHeader("token", callBackToken);
        get.setHeader("speakerId", inputData.getSpeakerId());
        HttpResponse response = client.execute(get);

        StringBuffer result = new StringBuffer();
        String line = "";
        BufferedReader rd = new BufferedReader(
                new InputStreamReader(response.getEntity().getContent()));
        while ((line = rd.readLine()) != null) {
            result.append(line);
        }
        rd.close();

        VerifyResponseDTO nuanceVerifyStatusResponse = (VerifyResponseDTO) classFromJson(VerifyResponseDTO.class, result.toString());
        nuanceVerifyStatusResponse.httpStatusCode = response.getStatusLine().getStatusCode();
        if (nuanceVerifyStatusResponse.httpStatusCode != 200){
            ErrorSpeakerStatusDTO errorData = (ErrorSpeakerStatusDTO) classFromJson(ErrorSpeakerStatusDTO.class, result.toString());
            nuanceVerifyStatusResponse.setErrorData(errorData);
            this.logger.error("Error when receiving verification from Nuance. Error code is: " + nuanceVerifyStatusResponse.httpStatusCode);
        }

        return nuanceVerifyStatusResponse;
    }

    public SpeakerStatusResponseDTO setSpeakerId(CidInputData cidData, String speakerId, String callBackToken, String callBackUrl) throws IOException{

        SetSpeakerIdInfoDTO speakerInfo = new SetSpeakerIdInfoDTO();
        speakerInfo.setAccountNumber(cidData.getAcctNo());
        speakerInfo.setFirstName(cidData.getFirstName());
        speakerInfo.setLastName(cidData.getLastName());
        speakerInfo.setAgentId(cidData.getAgentId());
        speakerInfo.setAgentSite(cidData.getAgentSite());
        speakerInfo.setCallBackUrl(callBackUrl);
        speakerInfo.setToken(callBackToken);
        speakerInfo.setSpeakerId(speakerId);
        String nuanceSetSpeakerURL = speakerInfo.getCallBackUrl()+ "/speakers/" + speakerInfo.getSpeakerId() + "/submit";
        logger.warn("Nuance Call Back URL: " + nuanceSetSpeakerURL);
        HttpClient client = HttpClientBuilder.create().build();
        HttpPost post = new HttpPost(nuanceSetSpeakerURL);
        post.setHeader(HttpHeaders.CONTENT_TYPE, "application/json");
        post.setHeader("token", speakerInfo.getToken());
        post.setHeader("speakerId", speakerInfo.getSpeakerId());
        String bodyJson = this.setNuanceRequestBodyForSpeakerStatus(speakerInfo);
        logger.warn("Request body for setSpeakerId: " + bodyJson);
        StringEntity requestBody = new StringEntity(bodyJson);
        post.setEntity(requestBody);
        HttpResponse response = client.execute(post);
        StringBuffer result = new StringBuffer();
        String line = "";
        BufferedReader rd = new BufferedReader(
                new InputStreamReader(response.getEntity().getContent()));
        while ((line = rd.readLine()) != null) {
            result.append(line);
        }
        rd.close();
        logger.warn("Response status when call Nuance to set the speakerID: " + Integer.toString(response.getStatusLine().getStatusCode()));
        logger.warn("Full response after callback Url invoked: " + result.toString());
        SpeakerStatusResponseDTO speakerStatusResponseDTO = (SpeakerStatusResponseDTO) classFromJson(SpeakerStatusResponseDTO.class, result.toString());
        speakerStatusResponseDTO.httpStatusCode = response.getStatusLine().getStatusCode();
         if (speakerStatusResponseDTO.httpStatusCode != 200){
             ErrorSpeakerStatusDTO errorData = (ErrorSpeakerStatusDTO) classFromJson(ErrorSpeakerStatusDTO.class, result.toString());
             speakerStatusResponseDTO.setErrorData(errorData);
             this.logger.error("Error when send speaker ID to Nuance. Error code from Nuance response obtained using: response.getStatusLine().getStatusCode(): " + speakerStatusResponseDTO.httpStatusCode);
         }

        return speakerStatusResponseDTO;
    }
    private String setNuanceRequestBodyForSpeakerStatus(SetSpeakerIdInfoDTO data) throws IOException {
        RequestBodyForSpeakerIdObj requestBodyObj = new RequestBodyForSpeakerIdObj();
        requestBodyObj.setAccountNumber(data.getAccountNumber());
        requestBodyObj.setFirstName(data.getFirstName());
        requestBodyObj.setLastName(data.getLastName());
        requestBodyObj.setAgentId(data.getAgentId());
        requestBodyObj.setAgentSite(data.getAgentSite());
        return toJson(requestBodyObj);
    }



}



