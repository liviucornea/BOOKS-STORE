package com.scotiabank.voice.bio.delegate;

import com.ibm.as400.access.AS400;
import com.ibm.as400.access.AS400ConnectionPool;
import com.scotiabank.voice.bio.GetPropertiesSettings;
import org.springframework.stereotype.Service;

/**
 * Created by LCornea on 5/25/2017.
 */

@Service
public class AS400ConnectionService extends BaseDelegate{
    private GetPropertiesSettings properties = GetPropertiesSettings.instance();
    private String as400Driver = "com.ibm.as400.access.AS400JDBCDriver";
    // Create an AS400ConnectionPool.
    public AS400ConnectionPool as400ConnPool;

    public AS400ConnectionService(){

        try {
            //Connect to iSeries
            Class.forName(this.as400Driver);
            as400ConnPool = new AS400ConnectionPool();
            as400ConnPool.setMaxConnections(Integer.parseInt(properties.as400MaxConnections));
            as400ConnPool.fill(properties.as400System, properties.as400UserId, properties.as400Password, AS400.COMMAND,5);
        }catch(Exception e){
            logger.error("Connection Pool to AS 400 can not be created" + e);
        }
    }



}
