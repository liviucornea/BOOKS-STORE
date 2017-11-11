package com.scotiabank.voice.bio.data;

/**
 * Created by LCornea on 6/9/2017.
 */
public class VerifySpeakerIdInputData extends BaseData {
    private String speakerId;
    private String agentExtension;

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



    public VerifySpeakerIdInputData(){}

}
