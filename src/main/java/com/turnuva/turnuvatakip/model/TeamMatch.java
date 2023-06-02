package com.turnuva.turnuvatakip.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;

@Entity
@Table(name = "team_matches")
public class TeamMatch {

    public TeamMatch() {

    }

    public TeamMatch(Team team1, Team team2,int score) {
        this.team1 = team1;
        this.team2 = team2;
        this.score = score;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @NotBlank
    @ManyToOne
    @JoinColumn(name = "team1_id")
    private Team team1;

    @NotBlank
    @ManyToOne
    @JoinColumn(name = "team2_id")
    private Team team2;


    @Column(name = "score")
    private int score;


    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public Team getTeam1() {
        return team1;
    }

    public void setTeam1(Team team1) {
        this.team1 = team1;
    }

    public Team getTeam2() {
        return team2;
    }

    public void setTeam2(Team team2) {
        this.team2 = team2;
    }

    public int getScore() {
        return score;
    }

    public void setScore(int score) {
        this.score = score;
    }
    
}
