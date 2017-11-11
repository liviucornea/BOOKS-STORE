package com.scotiabank.voice.bio.data.notifications;

import com.scotiabank.voice.bio.data.BaseData;

/**
 * Created by LCornea on 5/16/2017.
 */
public class EnrollResponseDTO extends BaseData {

    private String finalEnrollStatus;
    private String errorMessage;
    private String netAudio;
    private String maximumAudio;
    private String invalidityReason;
    private boolean isAdaptation;
    private String freeSpeechSessionId;
    private String callId ;



    public EnrollResponseDTO(){}

    public String getFinalEnrollStatus() {
        return finalEnrollStatus;
    }

    public void setFinalEnrollStatus(String finalEnrollStatus) {
        this.finalEnrollStatus = finalEnrollStatus;
    }

    public String getErrorMessage() {
        return errorMessage;
    }

    public void setErrorMessage(String errorMessage) {
        this.errorMessage = errorMessage;
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

    public String getInvalidityReason() {
        return invalidityReason;
    }

    public void setInvalidityReason(String invalidityReason) {
        this.invalidityReason = invalidityReason;
    }

    public boolean isAdaptation() {
        return isAdaptation;
    }

    public void setAdaptation(boolean adaptation) {
        isAdaptation = adaptation;
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
