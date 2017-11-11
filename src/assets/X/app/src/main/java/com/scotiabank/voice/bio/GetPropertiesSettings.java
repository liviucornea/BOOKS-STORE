package com.scotiabank.voice.bio;

import com.scotiabank.voice.bio.controllers.VoiceBioController;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.InputStream;
import java.util.Properties;
/**
 * Created by LCornea on 4/24/2017.
 */
public class GetPropertiesSettings {
    static private GetPropertiesSettings _instance = null;
    public String userCAMS;
    public String passwordCAMS;
    public String camsServiceAccount;
    public String camsGetUserByCidUrl;
    public String camsGetSpeakerIdByIdUrl;
    public String camsPreregisterUrl;
    public String camsUpdateVBMStatusBySpeakerIdUrl;
    public String as400System;
    public String  as400UserId;
    public String as400Password;
    public String as400MaxConnections;
    public String as400VBMProgramName;
    public String licenseUserName;
    public String licensePassword;
    public String defaultSpeackerId;
    final Logger logger = LoggerFactory.getLogger(VoiceBioController.class);
    InputStream inputStream;

    static public GetPropertiesSettings instance(){
        if (_instance == null) {
            _instance = new GetPropertiesSettings();
        }
        return _instance;
    }

    protected GetPropertiesSettings() {
        try {
            Properties prop = new Properties();
            String propFileName = "application.properties";

            inputStream = getClass().getClassLoader().getResourceAsStream(propFileName);

            if (inputStream != null) {
                prop.load(inputStream);
                this.userCAMS = prop.getProperty("cams.user");
                //this.passwordCAMS = prop.getProperty("cams.password");
                this.passwordCAMS = Encryptor.base64Encode(Encryptor.decrypt(prop.getProperty("cams.password")));
                this.camsServiceAccount = prop.getProperty("cams.ServiceAccount");
                this.camsGetUserByCidUrl = prop.getProperty("cams.getUserByCidUrl");
                this.camsGetSpeakerIdByIdUrl = prop.getProperty("cams.getSpeakerIdByIdUrl");
                this.camsPreregisterUrl = prop.getProperty("cams.preRegisterUrl");
                this.camsUpdateVBMStatusBySpeakerIdUrl = prop.getProperty("cams.updateVBMStatusBySpeakerIdUrl");
                this.defaultSpeackerId = prop.getProperty("defaultSpeackerId");
                this.as400System = prop.getProperty("as400.system");
                this.as400UserId = prop.getProperty("as400.userId");
                this.as400Password = prop.getProperty("as400.password");
                this.as400MaxConnections = prop.getProperty("as400.MaxConnections");
                this.as400VBMProgramName = prop.getProperty("as400.VBMProgramName");
                this.licenseUserName =  prop.getProperty("license.UserName");
                this.licensePassword = prop.getProperty("license.Password");

            } else {
                //throw new FileNotFoundException("property file '" + propFileName + "' not found in the classpath");
            logger.error("property file '" + propFileName + "' not found in the classpath");
            }

        } catch (Exception e) {
            System.out.println("Exception: " + e);
        }
    }


}
