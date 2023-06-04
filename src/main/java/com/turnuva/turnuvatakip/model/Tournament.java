package com.turnuva.turnuvatakip.model;

import com.turnuva.turnuvatakip.constants.Enums.ETournamentType;

import jakarta.persistence.*;

@Entity
@Table(name = "tournaments", uniqueConstraints = {
        @UniqueConstraint(columnNames = { "year", "typeValue" }),
})
public class Tournament {

    public Tournament() {

    }

    public Tournament(int year, ETournamentType typeValue, int maxPlayerCount) {
        this.year = year;
        this.typeValue = typeValue;
        this.maxPlayerCount = maxPlayerCount;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @Column(name = "year")
    private int year;

    @Enumerated(EnumType.ORDINAL)
    @Column(name = "typeValue")
    private ETournamentType typeValue;

    @Column(name = "max_player_count")
    private int maxPlayerCount;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public int getYear() {
        return year;
    }

    public void setYear(int year) {
        this.year = year;
    }

    public ETournamentType getTypeValue() {
        return typeValue;
    }

    public void setTypeValue(ETournamentType typeValue) {
        this.typeValue = typeValue;
    }

    public int getMaxPlayerCount() {
        return maxPlayerCount;
    }

    public void setMaxPlayerCount(int maxPlayerCount) {
        this.maxPlayerCount = maxPlayerCount;
    }
}
