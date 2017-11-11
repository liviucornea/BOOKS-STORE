package com.scotiabank.voice.bio.data.nuance;

import com.scotiabank.voice.bio.data.BaseData;

/**
 * Created by LCornea on 5/12/2017.
 */
public class SetSpeakerIdInfoDTO extends BaseData {
    private String accountNumber;
    private String firstName;
    private String lastName;
    private String agentId;
    private String agentSite;
    private String speakerId;
    private String token;
    private String callBackUrl;

    public String getSpeakerId() {
        return speakerId;
    }

    public void setSpeakerId(String speackerId) {
        this.speakerId = speackerId;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getCallBackUrl() {
        return callBackUrl;
    }

    public void setCallBackUrl(String callBackUrl) {
        this.callBackUrl = callBackUrl;
    }





    public SetSpeakerIdInfoDTO(){};

    public String getAccountNumber() {
        return accountNumber;
    }

    public void setAccountNumber(String accountNumber) {
        this.accountNumber = accountNumber;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getAgentId() {
        return agentId;
    }

    public void setAgentId(String agentId) {
        this.agentId = agentId;
    }

    public String getAgentSite() {
        return agentSite;
    }

    public void setAgentSite(String agentSite) {
        this.agentSite = agentSite;
    }


}
