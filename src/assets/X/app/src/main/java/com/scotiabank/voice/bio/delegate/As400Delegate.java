package com.scotiabank.voice.bio.delegate;

import com.ibm.as400.access.*;
import com.ibm.as400.access.AS400ConnectionPool;
import com.scotiabank.voice.bio.GetPropertiesSettings;
import com.scotiabank.voice.bio.data.CidInputData;
import com.scotiabank.voice.bio.data.notifications.NotificationInputDTO;
import com.scotiabank.voice.bio.data.nuance.SpeakerStatusForAs400DTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

/**
 * Created by LCornea on 5/17/2017.
 */
@Service
public class As400Delegate extends BaseDelegate {

    @Autowired
    private AS400ConnectionService connectionService;

    private GetPropertiesSettings properties = GetPropertiesSettings.instance();
    public String setSpeackerId(CidInputData cidData,  SpeakerStatusForAs400DTO speakerStatusResponse){
      // code to be implemented here to send speaker id to AS400
        try {
            // Create a connection to the AS400.COMMAND service. (Use the service number constants
            // defined in the AS400 class (FILE, PRINT, COMMAND, DATAQUEUE, and so on.))
            AS400 as400Connection =  connectionService.as400ConnPool.getConnection(properties.as400System, properties.as400UserId, properties.as400Password,AS400.COMMAND);
            String programName = properties.as400VBMProgramName;
            ProgramCall pgm = new ProgramCall(as400Connection);
            String cid = cidData.getCid();
            ProgramParameter[] paramList = new ProgramParameter[1];
            AS400Text txt2000 = new AS400Text(2000);
            paramList[0] = new ProgramParameter( txt2000.toBytes(toJson(speakerStatusResponse)),2000);
            pgm.setProgram(programName, paramList);
            logger.warn("As400 set speakerID: JSON enrolment status is: " + toJson(speakerStatusResponse));
            if (!pgm.run()){
                logger.error("AS400Delegate service, setSpeakerID, Error when run AS400 program: " + programName);
                AS400Message[] msgList = pgm.getMessageList();
                for (int i=0; i < msgList.length; i++)
                {
                    logger.error(msgList[i].getText());
                }
                return "ERROR";
            }

            // Return connection to the pool
            connectionService.as400ConnPool.returnConnectionToPool(as400Connection);
        } catch (Exception e){
            logger.error("AS400Delegate service, setSpeakerID, error class: " + e.getClass());
            logger.error(" ---> Error trying to set speaker Id in AS 400:" + e.toString());
        }

        return "OK";
    }

    public String setNotification(NotificationInputDTO notification, String nuanceInput){
        // code to be implemented here to send notification to AS400
        logger.warn("AS400 setNotification invoked with the input: " + nuanceInput);
        String sendResult = this.callAS400Program(nuanceInput);
        if (!sendResult.equals("OK")){
            logger.error("Not able to send notification to AS400 !");
            return "ERROR";
        }
        return "OK";
    }

    public String sendErrorMessage( String errMessage){
        logger.warn("AS400 send error invoked with errorMessage: " + errMessage);
        String sendResult = this.callAS400Program(errMessage);
        if (!sendResult.equals("OK")){
           logger.error("Not able to send message error to AS400 !");
           return "ERROR";
        }
        return "OK";
    }
     private String callAS400Program(String programInput){
         try {
             AS400 as400Connection =  connectionService.as400ConnPool.getConnection(properties.as400System, properties.as400UserId, properties.as400Password,AS400.COMMAND);
             // String programName = "/QSYS.LIB/VBLIB.LIB/VBM006R.PGM";
             String programName = properties.as400VBMProgramName;
             ProgramCall pgm = new ProgramCall(as400Connection);
             AS400Text txt2000 = new AS400Text(2000);
             ProgramParameter[] paramList = new ProgramParameter[1];
             paramList[0] = new ProgramParameter( txt2000.toBytes(programInput),2000);
             pgm.setProgram(programName, paramList);
             logger.warn("VBM006R.PGM - AS400 program called with JSON param = " + programInput);
             if (!pgm.run()){
                 logger.error("AS400Delegate service, Not able to run program: " + programName);
                 AS400Message[] msgList = pgm.getMessageList();
                 for (int i=0; i<msgList.length; i++)
                 {
                     logger.error(msgList[i].getText());
                 }
                 return "ERROR";
             }
             logger.warn("VBM006R.PGM - AS400 program successfuly executed!");
             // Return connection to the pool
             connectionService.as400ConnPool.returnConnectionToPool(as400Connection);
         } catch (Exception e){
             logger.error("AS400Delegate service, callAS400Program, error class: " + e.getClass());
             logger.error(" ---> Error trying to call  AS 400 program : " + e.getMessage());
             return "ERROR";
         }
            return "OK";
     }

    public As400Delegate(){
    }

}
