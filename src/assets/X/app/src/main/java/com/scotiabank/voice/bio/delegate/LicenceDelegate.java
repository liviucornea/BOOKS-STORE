package com.scotiabank.voice.bio.delegate;

import com.scotiabank.voice.bio.GetPropertiesSettings;
import org.apache.commons.codec.binary.Base64;
import org.apache.http.Header;
import org.apache.http.HttpResponse;
import org.apache.http.auth.UsernamePasswordCredentials;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.auth.BasicScheme;
import org.apache.http.impl.client.HttpClientBuilder;
import org.bouncycastle.util.encoders.Base64Encoder;
import org.json.JSONObject;
import org.json.XML;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.nio.charset.Charset;
import java.nio.charset.StandardCharsets;

@Service
public class LicenceDelegate extends  BaseDelegate  {

    public LicenceDelegate () {}

        private GetPropertiesSettings properties = GetPropertiesSettings.instance();
        public String getLicenceInfo( String locationURL ) throws IOException {

            HttpGet get = new HttpGet(locationURL);
            String auth = properties.licenseUserName + ":" + properties.licensePassword;
            byte[] encodedAuth = Base64.encodeBase64(
            auth.getBytes(Charset.forName("ISO-8859-1")));
            String authHeader = "Basic " + new String(encodedAuth);
            get.setHeader(HttpHeaders.AUTHORIZATION, authHeader);
//            logger.warn("Before calling client execute to get licence info. Credentials should be setted here");
            HttpClient client = HttpClientBuilder.create().build();
            HttpResponse response = client.execute(get);
            if (response.getStatusLine().getStatusCode() != 200){
                logger.error("HTTP error: " + response.getStatusLine().getStatusCode()+ " when calling url:" + locationURL );
                return "{'error': " +" 'HTTP code:"+ response.getStatusLine().getStatusCode() + " : " +response.getStatusLine().getReasonPhrase() +" : URL: "+ locationURL + "' }" ;
            }

            StringBuffer result = new StringBuffer();
            String line = "";
            BufferedReader rd = new BufferedReader(
                    new InputStreamReader(response.getEntity().getContent()));
            while ((line = rd.readLine()) != null) {
                result.append(line);
            }
            rd.close();
            JSONObject soapDatainJsonObject = XML.toJSONObject(result.toString());
            logger.warn("Licence info obtained and transformed from XML to JSON and returned." );
            return soapDatainJsonObject.toString();
        }

}
