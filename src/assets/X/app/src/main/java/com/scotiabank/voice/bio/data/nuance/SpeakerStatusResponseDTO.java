package com.scotiabank.voice.bio.data.nuance;

import com.scotiabank.voice.bio.data.BaseData;

import java.util.function.BooleanSupplier;

/**
 * Created by LCornea on 5/23/2017.
 */
public class SpeakerStatusResponseDTO extends BaseData{
    public Boolean optedOut ;
    public String  optOutDate;
    public String  optOutReason ;
    public Boolean locked ;
    public String lockDate;
    public String lockReason ;
    public String finalEnrollStatus ;
    public Integer httpStatusCode ;
    public ErrorSpeakerStatusDTO errorData;

    public ErrorSpeakerStatusDTO getErrorData() {
        return errorData;
    }

    public void setErrorData(ErrorSpeakerStatusDTO errorData) {
        this.errorData = errorData;
    }

    public SpeakerStatusResponseDTO(){}

    public Integer getHttpStatusCode() {
        return httpStatusCode;
    }

    public void setHttpStatusCode(Integer httpStatusCode) {
        this.httpStatusCode = httpStatusCode;
    }


    public Boolean getOptedOut() {
        return optedOut;
    }

    public void setOptedOut(Boolean optedOut) {
        this.optedOut = optedOut;
    }

    public String getOptOutDate() {
        return optOutDate;
    }

    public void setOptOutDate(String optOutDate) {
        this.optOutDate = optOutDate;
    }

    public String getOptOutReason() {
        return optOutReason;
    }

    public void setOptOutReason(String optOutReason) {
        this.optOutReason = optOutReason;
    }

    public Boolean getLocked() {
        return locked;
    }

    public void setLocked(Boolean locked) {
        this.locked = locked;
    }

    public String getLockDate() {
        return lockDate;
    }

    public void setLockDate(String lockDate) {
        this.lockDate = lockDate;
    }

    public String getLockReason() {
        return lockReason;
    }

    public void setLockReason(String lockReason) {
        this.lockReason = lockReason;
    }

    public String getFinalEnrollStatus() {
        return finalEnrollStatus;
    }

    public void setFinalEnrollStatus(String finalEnrollStatus) {
        this.finalEnrollStatus = finalEnrollStatus;
    }


}
