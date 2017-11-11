package com.scotiabank.voice.bio.data.nuance;

/**
 * Created by LCornea on 5/24/2017.
 * *Note that this class is not documented, I looked in response from Nuance and built it accordingly (Liviu Cornea)
 */
public class NuanceErrorSpeaker {
    public String errorMessage;
    public String errorContext;
    public String errorType;
    public String serverName;
    public String dateTime;

    public String getErrorMessage() {
        return errorMessage;
    }

    public void setErrorMessage(String errorMessage) {
        this.errorMessage = errorMessage;
    }

    public String getErrorContext() {
        return errorContext;
    }

    public void setErrorContext(String errorContext) {
        this.errorContext = errorContext;
    }

    public String getErrorType() {
        return errorType;
    }

    public void setErrorType(String errorType) {
        this.errorType = errorType;
    }

    public String getServerName() {
        return serverName;
    }

    public void setServerName(String serverName) {
        this.serverName = serverName;
    }

    public String getDateTime() {
        return dateTime;
    }

    public void setDateTime(String dateTime) {
        this.dateTime = dateTime;
    }



    public NuanceErrorSpeaker(){}

}
