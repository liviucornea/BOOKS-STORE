package com.scotiabank.voice.bio.data.license;

import com.scotiabank.voice.bio.data.BaseData;

public class LicenceInputData extends BaseData {
    public String getForServerUrl() {
        return forServerUrl;
    }

    public void setForServerUrl(String forServerUrl) {
        this.forServerUrl = forServerUrl;
    }

    private String forServerUrl;



    public LicenceInputData(){}
}
