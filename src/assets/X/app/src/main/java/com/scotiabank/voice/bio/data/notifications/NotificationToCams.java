package com.scotiabank.voice.bio.data.notifications;

import com.scotiabank.voice.bio.data.BaseData;

/**
 * Created by LCornea on 5/17/2017.
 */
public class NotificationToCams extends BaseData {

    private String  speakerId;
    private String vbmStatus;

    public String getSpeakerId() {
        return speakerId;
    }

    public void setSpeakerId(String speakerId) {
        this.speakerId = speakerId;
    }

    public String getVbmStatus() {
        return vbmStatus;
    }

    public void setVbmStatus(String vbmStatus) {
        this.vbmStatus = vbmStatus;
    }




    public NotificationToCams(){}
}
