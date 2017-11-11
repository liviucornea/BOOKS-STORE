package com.scotiabank.voice.bio.data.cams;

import com.scotiabank.voice.bio.data.BaseData;

import java.util.ArrayList;

/**
 * Created by LCornea on 5/11/2017.
 */
public class PreregisterResponseUserDTO extends BaseData {

    private String id ;
    private String firstName;
    private String lastName;
    private String bnsCommunity;
    private String bnsProfileState;
    private String bnsProfileStatus;
    private ArrayList<MembershipDTO> appMembership;
    private String cid;


    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
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

    public String getBnsCommunity() {
        return bnsCommunity;
    }

    public void setBnsCommunity(String bnsCommunity) {
        this.bnsCommunity = bnsCommunity;
    }

    public String getBnsProfileState() {
        return bnsProfileState;
    }

    public void setBnsProfileState(String bnsProfileState) {
        this.bnsProfileState = bnsProfileState;
    }

    public String getBnsProfileStatus() {
        return bnsProfileStatus;
    }

    public void setBnsProfileStatus(String bnsProfileStatus) {
        this.bnsProfileStatus = bnsProfileStatus;
    }


    public String getCid() {
        return cid;
    }

    public void setCid(String cid) {
        this.cid = cid;
    }
    public ArrayList<MembershipDTO> getAppMembership() {
        return appMembership;
    }

    public void setAppMembership(ArrayList<MembershipDTO> appMembership) {
        this.appMembership = appMembership;
    }



    public PreregisterResponseUserDTO(){}
}
