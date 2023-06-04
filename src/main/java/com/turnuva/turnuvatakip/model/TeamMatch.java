package com.turnuva.turnuvatakip.model;

import jakarta.persistence.*;

@Entity
@Table(name = "team_matches")
public class TeamMatch {

    public TeamMatch() {

    }

    public TeamMatch(Team team1, Team team2, String score) {
        this.team1 = team1;
        this.team2 = team2;
        this.score = score;
        calculatePoints();
    }

    public void calculatePoints(){
        if (this.score != null && !this.score.trim().isEmpty()) {
            var scores = score.split("-");
            var team1Goal = Integer.parseInt(scores[0]);
            var team2Goal = Integer.parseInt(scores[1]);
            if (team1Goal > team2Goal) {
                this.setTeam1Point(3);
                this.setTeam2Point(0);
            } else if (team1Goal < team2Goal) {
                this.setTeam1Point(0);
                this.setTeam2Point(3);
            } else {
                this.setTeam1Point(1);
                this.setTeam2Point(1);
            }
        } else {
            this.setTeam1Point(0);
            this.setTeam2Point(0);
        }
    }

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @ManyToOne
    @JoinColumn(name = "team1_id")
    private Team team1;

    @Column(name = "team1_point")
    private int team1Point;

    @ManyToOne
    @JoinColumn(name = "team2_id")
    private Team team2;

    @Column(name = "team2_point")
    private int team2Point;

    @Column(name = "score")
    private String score;

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

    public int getTeam1Point() {
        return team1Point;
    }

    public void setTeam1Point(int team1Point) {
        this.team1Point = team1Point;
    }

    public int getTeam2Point() {
        return team2Point;
    }

    public void setTeam2Point(int team2Point) {
        this.team2Point = team2Point;
    }

    public String getScore() {
        return score;
    }

    public void setScore(String score) {
        this.score = score;
    }

}
