package com.scotiabank.voice.bio.delegate;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.scotiabank.voice.bio.controllers.VoiceBioController;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.IOException;

/**
 * Created by LiviuCornea on 04/19/2017.
 */
public class BaseDelegate {
    final Logger logger = LoggerFactory.getLogger(VoiceBioController.class);

    protected Object classFromJson(Class cls, String request) throws IOException {
        Object res = null;

        if (request != null) {
            ObjectMapper mapper = new ObjectMapper();
            mapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
            res = mapper.readValue(request, cls);
        }

        return res;
    }
    protected Object classFromJsonForcedProperties(Class cls, String request) throws IOException {
        Object res = null;

        if (request != null) {
            ObjectMapper mapper = new ObjectMapper();
            res = mapper.readValue(request, cls);
        }

        return res;
    }

    protected String toJson(Object dt) throws JsonProcessingException {
        return new ObjectMapper().writeValueAsString(dt);
    }


}
