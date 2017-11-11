package com.scotiabank.voice.bio.data.notifications;

import com.scotiabank.voice.bio.data.BaseData;
import com.scotiabank.voice.bio.data.nuance.ErrorSpeakerStatusDTO;

/**
 * Created by LCornea on 5/17/2017.
 */
public class VerifyResponseDTO extends BaseData {

    private String decision;
    private String  decisionReason;
    private String  netAudio;
    private String maximumAudio;
    private Boolean isVerificationComplete;
    private String  genderScore;
    private String  freeSpeechSessionId;
    private String callId ;
    public Integer httpStatusCode ;
    public ErrorSpeakerStatusDTO errorData;

    public Integer getHttpStatusCode() {
        return httpStatusCode;
    }

    public void setHttpStatusCode(Integer httpStatusCode) {
        this.httpStatusCode = httpStatusCode;
    }

    public ErrorSpeakerStatusDTO getErrorData() {
        return errorData;
    }

    public void setErrorData(ErrorSpeakerStatusDTO errorData) {
        this.errorData = errorData;
    }



    public VerifyResponseDTO(){}

    public String getDecision() {
        return decision;
    }

    public void setDecision(String decision) {
        this.decision = decision;
    }

    public String getDecisionReason() {
        return decisionReason;
    }

    public void setDecisionReason(String decisionReason) {
        this.decisionReason = decisionReason;
    }

    public String getNetAudio() {
        return netAudio;
    }

    public void setNetAudio(String netAudio) {
        this.netAudio = netAudio;
    }

    public String getMaximumAudio() {
        return maximumAudio;
    }

    public void setMaximumAudio(String maximumAudio) {
        this.maximumAudio = maximumAudio;
    }

    public Boolean getVerificationComplete() {
        return isVerificationComplete;
    }

    public void setVerificationComplete(Boolean verificationComplete) {
        isVerificationComplete = verificationComplete;
    }

    public String getGenderScore() {
        return genderScore;
    }

    public void setGenderScore(String genderScore) {
        this.genderScore = genderScore;
    }

    public String getFreeSpeechSessionId() {
        return freeSpeechSessionId;
    }

    public void setFreeSpeechSessionId(String freeSpeechSessionId) {
        this.freeSpeechSessionId = freeSpeechSessionId;
    }

    public String getCallId() {
        return callId;
    }

    public void setCallId(String callId) {
        this.callId = callId;
    }



}
