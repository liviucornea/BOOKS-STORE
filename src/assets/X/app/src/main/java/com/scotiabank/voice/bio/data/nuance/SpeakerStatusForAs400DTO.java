package com.scotiabank.voice.bio.data.nuance;

import com.scotiabank.voice.bio.data.BaseData;

/**
 * Created by LCornea on 5/29/2017.
 * this class is transformed to JSO and sent it to AS400
 * once response to Set speaker Id is coming from Nuance
 */
public class SpeakerStatusForAs400DTO extends BaseData {
    public String cid ;
    public String speakerId;
    public Boolean optedOut ;
    public String  optOutDate;
    public String  optOutReason ;
    public Boolean locked ;
    public String lockDate;
    public String lockReason ;
    public String finalEnrollStatus ;


    public String getCid() {
        return cid;
    }

    public void setCid(String cid) {
        this.cid = cid;
    }



    public String getSpeakerId() {
        return speakerId;
    }

    public void setSpeakerId(String speakerId) {
        this.speakerId = speakerId;
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




    public SpeakerStatusForAs400DTO(){}


}
