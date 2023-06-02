package com.turnuva.turnuvatakip.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;

@Entity
@Table(name = "teams", uniqueConstraints = {
        @UniqueConstraint(columnNames = "team_name"),
        @UniqueConstraint(columnNames = "team_leader_id")
})
public class Team {

    public Team() {

    }

    public Team(Tournament tournament, String teamName, User teamLeader) {
        this.tournament = tournament;
        this.teamName = teamName;
        this.teamLeader = teamLeader;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @NotBlank
    @ManyToOne
    @JoinColumn(name = "tournament_id")
    private Tournament tournament;

    @NotBlank
    @Column(name = "team_name")
    private String teamName;

    @NotBlank
    @ManyToOne
    @JoinColumn(name = "team_leader_id")
    private User teamLeader;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }


    public String getTeamName() {
        return teamName;
    }

    public void setTeamName(String teamName) {
        this.teamName = teamName;
    }

    public User getTeamLeader() {
        return teamLeader;
    }

    public void setTeamLeader(User teamLeader) {
        this.teamLeader = teamLeader;
    }

    public Tournament getTournament() {
        return tournament;
    }

    public void setTournament(Tournament tournament) {
        this.tournament = tournament;
    }
}
