package com.scotiabank.voice.bio.data.cams;

import com.scotiabank.voice.bio.data.BaseData;

/**
 * Created by LCornea on 5/8/2017.
 */
public class MembershipDTO extends BaseData {

    public String getChannelUserId() {
        return channelUserId;
    }

    public void setChannelUserId(String channelUserId) {
        this.channelUserId = channelUserId;
    }

    private String channelUserId;
    private String appId;

    public MembershipDTO(){}



    public String getAppId() {
        return appId;
    }

    public void setAppId(String appId) {
        this.appId = appId;
    }


}
