package com.turnuva.turnuvatakip.respository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.turnuva.turnuvatakip.model.Tournament;

public interface TournamentRepository extends JpaRepository<Tournament, Long> {
}
