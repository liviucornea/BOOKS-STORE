package com.scotiabank.voice.bio.model;

import javax.persistence.*;
import java.util.Date;

/**
 * Created by LCornea on 4/27/2017.
 */

@Entity
@Table(name = "VoiceBioSession")
public class VoiceBioSession {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long Id;
    private String token;
    private String agentExtension;
    private String callBackUrl;
    @Column(name="create_date", insertable=false)
    public Date create_date;
    public Date getCreate_date() {
        return create_date;
    }

    public void setCreate_date(Date create_date) {
        this.create_date = create_date;
    }


    public Long getId() {
        return Id;
    }

    public void setId(Long id) {
        Id = id;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {   this.token = token;   }

    public String getAgentExtension() {
        return agentExtension;
    }

    public void setAgentExtension(String agentExtension) {
        this.agentExtension = agentExtension;
    }

    public String getCallBackUrl() {
        return callBackUrl;
    }

    public void setCallBackUrl(String callBackUrl) {
        this.callBackUrl = callBackUrl;
    }


}
