package com.scotiabank.voice.bio.repositories;

import com.scotiabank.voice.bio.model.VoiceBioSession;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Created by LCornea on 4/27/2017.
 */

@Repository
public interface  VoiceBioSessionRepository extends JpaRepository<VoiceBioSession, Long> {
    List<VoiceBioSession> findByAgentExtension(String extension);

    @Query("select s from VoiceBioSession s where  s.agentExtension = :agentExtension order by create_date desc")
    List<VoiceBioSession> findCallBack(@Param("agentExtension") String agentExtension);
}
