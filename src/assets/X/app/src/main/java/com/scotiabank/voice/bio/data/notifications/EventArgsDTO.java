package com.scotiabank.voice.bio.data.notifications;

import com.scotiabank.voice.bio.data.BaseData;

/**
 * Created by LCornea on 5/16/2017.
 */
public class EventArgsDTO extends BaseData {
    private String reason;
    private String  speakerId;
    private EnrollResponseDTO enrollResponse;
    private VerifyResponseDTO verifyResponse;

    public EventArgsDTO(){}

    public VerifyResponseDTO getVerifyResponse() {
        return verifyResponse;
    }

    public void setVerifyResponse(VerifyResponseDTO verifyResponse) {
        this.verifyResponse = verifyResponse;
    }

    public String getReason() {
        return reason;
    }

    public void setReason(String reason) {
        this.reason = reason;
    }

    public String getSpeakerId() {
        return speakerId;
    }

    public void setSpeakerId(String speakerId) {
        this.speakerId = speakerId;
    }

    public EnrollResponseDTO getEnrollResponse() {
        return enrollResponse;
    }

    public void setEnrollResponse(EnrollResponseDTO enrollResponse) {
        this.enrollResponse = enrollResponse;
    }



}
