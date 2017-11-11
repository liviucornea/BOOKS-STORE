package com.scotiabank.voice.bio.data.cams;

import com.scotiabank.voice.bio.data.BaseData;

import java.util.ArrayList;

/**
 * Created by LCornea on 5/15/2017.
 */
public class PreRegisterRequestBodyObj extends BaseData {

    private PreregisterAppUser   appUser;
    private String serviceAccount;

    public PreregisterAppUser getAppUser() {
        return appUser;
    }

    public void setAppUser(PreregisterAppUser appUser) {
        this.appUser = appUser;
    }

    public String getServiceAccount() {
        return serviceAccount;
    }

    public void setServiceAccount(String serviceAccount) {
        this.serviceAccount = serviceAccount;
    }

}
