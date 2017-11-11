package com.scotiabank.voice.bio.data.cams;

import com.scotiabank.voice.bio.data.BaseData;

/**
 * Created by LCornea on 6/13/2017.
 *
 * this class is intended to carry the information for VoiceBioControler method
 * if the speaker id is found there will be a value for it  otherwise will be UNDEFINED
 */
public class CamsServiceSpeakerOutputDTO extends BaseData {

    public String speakerID;
    public boolean hasErrors;
    public String errorMsg;

    public CamsServiceSpeakerOutputDTO(){
        this.hasErrors = false;
    }

    public boolean isHasErrors() {
        return hasErrors;
    }

    public void setHasErrors(boolean hasErrors) {
        this.hasErrors = hasErrors;
    }





    public String getSpeakerID() {
        return speakerID;
    }

    public void setSpeakerID(String speakerID) {
        this.speakerID = speakerID;
    }

    public String getErrorMsg() {
        return errorMsg;
    }

    public void setErrorMsg(String errorMsg) {
        this.errorMsg = errorMsg;
    }


}
