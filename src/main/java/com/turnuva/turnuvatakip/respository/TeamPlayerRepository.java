package com.turnuva.turnuvatakip.respository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.turnuva.turnuvatakip.model.TeamPlayer;
import java.util.List;
import com.turnuva.turnuvatakip.model.Team;



public interface TeamPlayerRepository extends JpaRepository<TeamPlayer, Long> {
    @Query(value = "select count(u.*) from team_players tp "
            + "inner join users u on u.id=tp.player_id "
            + "where tp.id!= :currentId and tp.team_id = :teamId and u.age < 30", nativeQuery = true)
    Integer getAgeLessThan30(@Param("teamId") Long teamId,@Param("currentId") Long currentId);

    List<TeamPlayer> findByTeamId(Long id);
    int countByTeam(Team team);
}
