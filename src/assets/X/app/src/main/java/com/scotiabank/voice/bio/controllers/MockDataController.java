package com.scotiabank.voice.bio.controllers;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.io.BufferedReader;
import java.io.InputStreamReader;

/**
 * Created by LCornea on 5/9/2017.
 */
@RestController
@Controller
public class MockDataController {
    final Logger logger = LoggerFactory.getLogger(VoiceBioController.class);


    @RequestMapping(value = "/mock/setStaticSpeakerIdByCamsId", method = RequestMethod.POST)
    @ResponseBody
    public String getStaticSpeakerIdByCamsId(@RequestBody String request){
        return "{\n" +
                "    \"status\": {\n" +
                "     \"code\": \"UPS000\",\n" +
                "     \"reason\": \"\",\n" +
                "     \"message\": \"The Search user by Speaker Id request processed successfully.\"\n" +
                "    },\n" +
                "    \"appUser\": {\n" +
                "            \"id\": \"f6ead24e-0c14-45d9-a1ea-9793e58dfbf5\",\n" +
                "            \"speakerId\": \"f6ead24e-0c14-45d9-a1ea-9793e58zebf5\",\n" +
                "            \"vbmStatus\": \"<To be Determined>\",\n" +
                "            \"appMembership\": \n" +
                "                [{\n" +
                "\t     \"cid\": \"017065040057339\",\n" +
                "\t      \"appId\": \"CIS\"\n" +
                "\t}]\n" +
                "        }\n" +
                "}";

    }




    @RequestMapping(value = "/mock/setStaticPreregister", method = RequestMethod.POST)
    @ResponseBody
    public String setStaticPreregister(@RequestBody String request){
        return "{\n" +
                "    \"status\": {\n" +
                "        \"code\": \"UPS000\",\n" +
                "        \"reason\": \"\",\n" +
                "        \"message\": \"The PreRegistartion user is successful\"\n" +
                "    },\n" +
                "    \"appUser\": {\n" +
                "        \"id\": \"41c1dcf9-33b4-4668-abf3-1a36d6ea62db\",\n" +
                "        \"firstName\": \"PrashantaVBM\",\n" +
                "        \"lastName\": \"Pathakk\",\n" +
                "        \"bnsCommunity\": \"SOL\",\n" +
                "        \"bnsProfileState\": \"PRG\",\n" +
                "        \"bnsProfileStatus\": null,\n" +
                "       \"appMembership\": [{\n" +
                "\t\"cid\": \"4536000005050299\",\n" +
                "\t\"appId\": \"CIS\"\n" +
                "       }],\n" +
                "        \"cid\": \"016775134223779\"\n" +
                "    }\n" +
                "}\n";


    }
    @RequestMapping(value = "/mock/setNotification", method = RequestMethod.POST)
    @ResponseBody
    public String setNotification (@RequestBody String request){
        return "{\n" +
                "    \"status\": {\n" +
                "    \"code\": \"UPS980\",\n" +
                "    \"reason\": \"\",\n" +
                "    \"message\": \" Successful in processing the request. \"\n" +
                "    },\n" +
                "    \"appUsers\": [\n" +
                "        {\n" +
                "            \"id\": \"f6ead24e-0c14-45d9-a1ea-9793e58dfbf5\",\n" +
                "            \"uid\": \"dcvactivation1\",\n" +
                "            \"speakerId\": \"7339\",\n" +
                "            \"vbmStatus\": \"Updated Status<To be Determined>\",\n" +
                "            \"appMembership\": [{\n" +
                "\t\"cid\": \"017065040057339\",\n" +
                "\t\"appId\": \"CIS\"\n" +
                "             }]\n" +
                "        }\n" +
                "    ]\n" +
                "}\n";
    }


    @RequestMapping(value = "/mock/getStaticSpeakerID", method = RequestMethod.POST)
    @ResponseBody
    public String getStaticSpeakerID(@RequestBody String request) {
        // TRACE, DEBUG, INFO, WARN, ERROR and FATAL.
        ///CID success search use case
       // logger.warn("In mock web service , requestbody:" + request);
        String resCidSuccess = "{\n" +
                "    \"status\": {\n" +
                "        \"code\": \"UPS000\",\n" +
                "        \"reason\": \"\",\n" +
                "        \"message\": \"The Search user by CID request processed successfully.\"\n" +
                "    },\n" +
                "    \"appUsers\": [\n" +
                "        {\n" +
                "            \"id\": \"f6ead24e-0c14-45d9-a1ea-9793e58dfbf5\",\n" +
                "            \"uid\": \"dcvactivation1\",\n" +
                "            \"firstName\": \"dcvactivation1\",\n" +
                "            \"lastName\": \"dcvactivation1\",\n" +
                "            \"speakerId\": \"73391234567890123456789012345678\",\n" +
                "            \"vbmStatus\": \"NOT Enrolled\",\n" +
                "\t\"appMembership\": [{\n" +
                "  \t        \"cid\": \"017065040057339\",\n" +
                "\t        \"appId\": \"CIS\"\n" +
                "\t}]\n" +
                "        }\n" +
                "    ]\n" +
                "}\n";

        String resCidMoreAppusers = " {\n" +
                "\t\"status\": {\n" +
                "\t\t\"code\": \"UPS000\",\n" +
                "\t\t\"reason\": \"\",\n" +
                "\t\t\"message\": \"The Search user by CID request processed successfully.\"\n" +
                "\t},\n" +
                "\t\"appUsers\": [{\n" +
                "\t\t\"id\": \"f6ead24e-0c14-45d9-a1ea-9793e58dfbf5\",\n" +
                "\t\t\"uid\": \"dcvactivation1\",\n" +
                "\t\t\"firstName\": \"dcvactivation1\",\n" +
                "\t\t\"lastName\": \"dcvactivation1\",\n" +
                "\t\t\"speakerId\": \"7339\",\n" +
                "\t\t\"vbmStatus\": \"<To be Determined>\",\n" +
                "\t\t\"appMembership\": [{\n" +
                "\t\t\t\"cid\": \"017065040057339\",\n" +
                "\t\t\t\"appId\": \"CIS\"\n" +
                "\t\t}, {\n" +
                "\t\t\t\"scotiaCard\": \"12435647859\",\n" +
                "\t\t\t\"appId\": \"SOL\"\n" +
                "\t\t}]\n" +
                "\t}, {\n" +
                "\t\t\"id\": \"f6ead24e-0c14-45d9-a1ea-9793e58dfbf5\",\n" +
                "\t\t\"uid\": \"dcvactivation1\",\n" +
                "\t\t\"firstName\": \"dcvactivation1\",\n" +
                "\t\t\"lastName\": \"dcvactivation1\",\n" +
                "\t\t\"speakerId\": \"7339\",\n" +
                "\t\t\"vbmStatus\": \"<To be Determined>\",\n" +
                "\t\t\"appMembership\": [{\n" +
                "\t\t\t\"cid\": \"017065040057339\",\n" +
                "\t\t\t\"appId\": \"CIS\"\n" +
                "\t\t}, {\n" +
                "\t\t\t\"scotiaCard\": \"12435647859\",\n" +
                "\t\t\t\"appId\": \"SOL\"\n" +
                "\t\t}]\n" +
                "\t}]\n" +
                "} ";


        String resCidMoreAppMembership = "{\n" +
                "\t\"status\": {\n" +
                "\t\t\"code\": \"UPS000\",\n" +
                "\t\t\"reason\": \"\",\n" +
                "\t\t\"message\": \"The Search user by CID request processed successfully.\"\n" +
                "\t},\n" +
                "\t\"appUsers\": [{\n" +
                "\t\t\"id\": \"f6ead24e-0c14-45d9-a1ea-9793e58dfbf5\",\n" +
                "\t\t\"uid\": \"dcvactivation1\",\n" +
                "\t\t\"firstName\": \"dcvactivation1\",\n" +
                "\t\t\"lastName\": \"dcvactivation1\",\n" +
                "\t\t\"speakerId\": \"7339\",\n" +
                "\t\t\"vbmStatus\": \"<To be Determined>\",\n" +
                "\t\t\"appMembership\": [{\n" +
                "\t\t\t\"cid\": \"017065040057339\",\n" +
                "\t\t\t\"appId\": \"CIS\"\n" +
                "\t\t}, {\n" +
                "\t\t\t\"cid\": \"017065040057339\",\n" +
                "\t\t\t\"appId\": \"CIS\"\n" +
                "\t\t}, {\n" +
                "\t\t\t\"scotiaCard\": \"12435647859\",\n" +
                "\t\t\t\"appId\": \"SOL\"\n" +
                "\t\t}]\n" +
                "\t}]\n" +
                "} ";



        String res = resCidSuccess;
      //  res = resCidMoreAppusers;
      // res = resCidMoreAppMembership;
        return res;
    }

}



// add header
            /*
            post.setHeader("User-Agent", USER_AGENT);

            List<NameValuePair> urlParameters = new ArrayList<NameValuePair>();
            urlParameters.add(new BasicNameValuePair("sn", "C02G8416DRJM"));
            urlParameters.add(new BasicNameValuePair("cn", ""));
            urlParameters.add(new BasicNameValuePair("locale", ""));
            urlParameters.add(new BasicNameValuePair("caller", ""));
            urlParameters.add(new BasicNameValuePair("num", "12345"));

            post.setEntity(new UrlEncodedFormEntity(urlParameters));
*/