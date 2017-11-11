package com.scotiabank.voice.bio.data.cams;

import com.scotiabank.voice.bio.data.BaseData;

import java.io.Serializable;

/**
 * Created by LCornea on 6/1/2017.
 */
public class GetSpeakerIdRequestBodyDTO extends BaseData {

    public String getCid() {
        return cid;
    }

    public void setCid(String cid) {
        this.cid = cid;
    }

    private String cid;

   public  GetSpeakerIdRequestBodyDTO (){}

}
