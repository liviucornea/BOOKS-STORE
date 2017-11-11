package com.scotiabank.voice.bio.data;

/**
 * Created by LiviuCornea on 04/19/2017.
 */
public class ErrorData extends BaseData{
    private boolean error;
    private String message;

    public ErrorData() {
        setError(true);
    }

    public boolean isError() {
        return error;
    }

    public void setError(boolean error) {
        this.error = error;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    @Override
    public String toString() {
        final StringBuilder sb = new StringBuilder("ErrorData{");
        sb.append("error=").append(error);
        sb.append(", message='").append(message).append('\'');
        sb.append('}');
        return sb.toString();
    }
}
