package com.scotiabank.voice.bio.data.cams;

import com.scotiabank.voice.bio.data.BaseData;

import java.util.ArrayList;

/**
 * Created by LCornea on 5/15/2017.
 */
public class PreregisterAppUser extends BaseData {

    private String firstName;
    private String lastName;
    private String cid;
    private ArrayList<MembershipDTO> appMembership;

    public PreregisterAppUser(){}


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

}
