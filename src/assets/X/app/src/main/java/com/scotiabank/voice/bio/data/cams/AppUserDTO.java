package com.scotiabank.voice.bio.data.cams;

import com.scotiabank.voice.bio.data.BaseData;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by LCornea on 5/8/2017.
 */
public class AppUserDTO extends BaseData {

    private String id;
    private String uid;
    private String firstName;
    private String lastName;
    private String vbmStatus;
    private String speakerId;
    private ArrayList<MembershipDTO> appMembership;


    public AppUserDTO(){}

    public String getId() {
        return id;
    }

    public String getSpeakerId() {
        return speakerId;
    }

    public void setSpeakerId(String speakerId) {
        this.speakerId = speakerId;
    }
    public void setId(String id) {
        this.id = id;
    }

    public String getUid() {
        return uid;
    }

    public void setUid(String uid) {
        this.uid = uid;
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

    public String getVbmStatus() {
        return vbmStatus;
    }

    public void setVbmStatus(String vbmStatus) {
        this.vbmStatus = vbmStatus;
    }

    public ArrayList<MembershipDTO> getAppMembership() {
        return appMembership;
    }

    public void setAppMembership(ArrayList<MembershipDTO> appMembership) {
        this.appMembership = appMembership;
    }


}
