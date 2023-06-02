package com.turnuva.turnuvatakip.respository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.turnuva.turnuvatakip.model.TeamPlayer;

public interface TeamPlayerRepository extends JpaRepository<TeamPlayer, Long> {
}