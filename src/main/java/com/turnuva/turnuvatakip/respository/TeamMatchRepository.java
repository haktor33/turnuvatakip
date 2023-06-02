package com.turnuva.turnuvatakip.respository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import com.turnuva.turnuvatakip.model.TeamMatch;
import com.turnuva.turnuvatakip.customQueries.IScoreBoard;

public interface TeamMatchRepository extends JpaRepository<TeamMatch, Long> {
    @Query(value = "select team_name as team,sum(score) as score from" 
    +"(select t.team_name,sum(m.team1_point) as score "
    +"from team_matches m "
    +"left join teams t on t.id = m.team1_id "
    +"group by t.team_name "        
    +"union all "        
    +"select t.team_name,sum(m.team2_point) as score "
    +"from team_matches m "
    +"left join teams t on t.id = m.team2_id " 
    +"group by t.team_name "
    +") sql1 "
    +"group by team_name order by score desc", nativeQuery = true)
    List<IScoreBoard> getScoreBoard();
}
