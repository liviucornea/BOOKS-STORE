package com.scotiabank.voice.bio.data.notifications;

import com.scotiabank.voice.bio.data.BaseData;

/**
 * Created by LCornea on 5/16/2017.
 */
public class NotificationInputDTO extends BaseData {

    private String timestamp;
    private String  eventType;
    private EventArgsDTO eventArgs;

    public NotificationInputDTO(){}

    public String getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(String timestamp) {
        this.timestamp = timestamp;
    }

    public String getEventType() {
        return eventType;
    }

    public void setEventType(String eventType) {
        this.eventType = eventType;
    }

    public EventArgsDTO getEventArgs() {
        return eventArgs;
    }

    public void setEventArgs(EventArgsDTO eventArgs) {
        this.eventArgs = eventArgs;
    }


}
