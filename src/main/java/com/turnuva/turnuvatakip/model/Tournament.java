package com.turnuva.turnuvatakip.model;
import jakarta.persistence.*;
@Entity
@Table(name = "tournaments", uniqueConstraints = {
        @UniqueConstraint(columnNames = {"year", "typeValue"}),
})
public class Tournament {

    public Tournament() {

    }

    public Tournament(int year, int typeValue) {
        this.year = year;
        this.typeValue = typeValue;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @Column(name = "year")
    private int year;

    @Column(name = "typeValue")
    private int typeValue;

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

    public int getTypeValue() {
        return typeValue;
    }

    public void setTypeValue(int typeValue) {
        this.typeValue = typeValue;
    }   
}
