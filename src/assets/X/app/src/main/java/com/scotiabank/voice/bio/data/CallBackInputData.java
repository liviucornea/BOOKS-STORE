package com.scotiabank.voice.bio.data;

/**
 * Created by LCornea on 5/1/2017.
 */
public class CallBackInputData extends BaseData {
    private String token;
    private String extension;
    private String callBackURL;

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getExtension() {
        return extension;
    }

    public void setExtension(String extension) {
        this.extension = extension;
    }

    public String getCallBackURL() {
        return callBackURL;
    }

    public void setCallBackURL(String callBackURL) {
        this.callBackURL = callBackURL;
    }

    @Override
    public String toString() {
        final StringBuilder sb = new StringBuilder("CallBackInputData{");
        sb.append("token ='").append(token).append('\'');
        sb.append(", extension ='").append(extension).append('\'');
        sb.append(", lastName ='").append(callBackURL).append('\'');
        sb.append('}');
        return sb.toString();
    }

}
   /*
        {
            "token": "somestring",
            "extension": "12345",
            "callBackURL": "https://server:port/freespeech-agent/rest/"
        }
    */