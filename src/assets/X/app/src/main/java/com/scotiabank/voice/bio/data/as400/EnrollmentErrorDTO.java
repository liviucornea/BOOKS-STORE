package com.scotiabank.voice.bio.data.as400;

import com.scotiabank.voice.bio.data.BaseData;

/**
 * Created by LCornea on 6/15/2017.
 */
public class EnrollmentErrorDTO extends BaseData {

    private String cid;
    private String agentExtension;
    private String errMsg;

    public EnrollmentErrorDTO(){}


    public String getCid() {
        return cid;
    }

    public void setCid(String cid) {
        this.cid = cid;
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
