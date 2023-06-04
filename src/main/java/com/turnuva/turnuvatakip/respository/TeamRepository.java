package com.turnuva.turnuvatakip.respository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.turnuva.turnuvatakip.model.Team;
import com.turnuva.turnuvatakip.model.User;

public interface TeamRepository extends JpaRepository<Team, Long> {
    Team findByTeamLeader(User teamLeader);
    Team findByTeamLeaderId(Long teamLeaderId);
}
