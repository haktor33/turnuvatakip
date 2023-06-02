package com.turnuva.turnuvatakip.respository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.turnuva.turnuvatakip.model.Team;

public interface TeamRepository extends JpaRepository<Team, Long> {
}
