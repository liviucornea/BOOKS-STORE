package com.scotiabank.voice.bio.delegate;

import com.scotiabank.voice.bio.data.CallBackInputData;
import com.scotiabank.voice.bio.model.VoiceBioSession;
import com.scotiabank.voice.bio.repositories.VoiceBioSessionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by LCornea on 5/3/2017.
 */
@Service
public class CallBackDelegate extends BaseDelegate {

// save call back input data to database
  public void setCallBackData (CallBackInputData data, VoiceBioSessionRepository voiceBioRepo) {
      VoiceBioSession lcBioSes = new VoiceBioSession();
      lcBioSes.setAgentExtension(data.getExtension());
      lcBioSes.setToken(data.getToken());
      lcBioSes.setCallBackUrl(data.getCallBackURL());
      voiceBioRepo.save(lcBioSes);
  }

    public VoiceBioSession getCallBackData(String agentExtension, VoiceBioSessionRepository voiceBioRepo ){
       // List<VoiceBioSession> agentSession  = voiceBioRepo.findByAgentExtension(agentExtension);
        //VoiceBioSession mySession = voiceBioRepo.findAll()
       // String url= voiceBioRepo.findCallBack(agentExtension).get(0).getCallBackUrl();
        //return agentSession.get(0).getAgentExtension();
        if (voiceBioRepo.findCallBack(agentExtension).isEmpty()) {
            return  null;
        }
        return voiceBioRepo.findCallBack(agentExtension).get(0);
    }

    public String getCallBackUrl(String agentExtension, VoiceBioSessionRepository voiceBioRepo ){
        // List<VoiceBioSession> agentSession  = voiceBioRepo.findByAgentExtension(agentExtension);
        //return agentSession.get(0).getAgentExtension();
        //VoiceBioSession mySession = voiceBioRepo.findAll()
        String url= voiceBioRepo.findCallBack(agentExtension).get(0).getCallBackUrl();

        return url;
    }



}
