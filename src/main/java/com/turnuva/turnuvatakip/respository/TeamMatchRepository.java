package com.turnuva.turnuvatakip.respository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.turnuva.turnuvatakip.model.TeamMatch;

public interface TeamMatchRepository extends JpaRepository<TeamMatch, Long> {
}
