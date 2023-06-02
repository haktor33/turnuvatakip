package com.turnuva.turnuvatakip.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;

@Entity
@Table(name = "team_players", uniqueConstraints = {
        @UniqueConstraint(columnNames = { "player_id" }),
})
public class TeamPlayer {

    public TeamPlayer() {

    }

    public TeamPlayer(Team team, User player) {
        this.team = team;
        this.player = player;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @NotBlank
    @ManyToOne
    @JoinColumn(name = "team_id")
    private Team team;

    @NotBlank
    @ManyToOne
    @JoinColumn(name = "player_id")
    private User player;

    @Column(name = "number")
    private String number;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public Team getTeam() {
        return team;
    }

    public void setTeam(Team team) {
        this.team = team;
    }

    public User getPlayer() {
        return player;
    }

    public void setPlayer(User player) {
        this.player = player;
    }

    public String getNumber() {
        return number;
    }

    public void setNumber(String number) {
        this.number = number;
    }

    
}
