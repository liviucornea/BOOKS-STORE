package com.scotiabank.voice.bio.data.as400;

import com.scotiabank.voice.bio.data.BaseData;

/**
 * Created by LCornea on 6/15/2017.
 *  * this class is used to send the error in specific format to AS400
 */
public class VerificationErrorDTO  extends BaseData {

    private String speakerId;
    private String agentExtension;
    private String errMsg;

    public VerificationErrorDTO (){}


    public String getSpeakerId() {
        return speakerId;
    }

    public void setSpeakerId(String speakerId) {
        this.speakerId = speakerId;
    }

    public String getAgentExtension() {
        return agentExtension;
    }

    public void setAgentExtension(String agentExtension) {
        this.agentExtension = agentExtension;
    }

    public String getErrMsg() {
        return errMsg;
    }

    public void setErrMsg(String errMsg) {
        this.errMsg = errMsg;
    }




}
