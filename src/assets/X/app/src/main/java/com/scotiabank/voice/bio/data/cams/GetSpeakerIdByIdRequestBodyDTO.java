package com.scotiabank.voice.bio.data.cams;

import com.scotiabank.voice.bio.data.BaseData;

/**
 * Created by LCornea on 6/1/2017.
 */
public class GetSpeakerIdByIdRequestBodyDTO extends BaseData {
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    private String id;

    public GetSpeakerIdByIdRequestBodyDTO(){}
}
