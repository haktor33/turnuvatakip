package com.turnuva.turnuvatakip.constants;

public class Enums {

  public enum ERol {
    ROLE_USER,
    ROLE_TEAMLEADER,
    ROLE_ADMIN
  }

  public enum ETournamentType {
    FOOTBALL,
    BASKETBALL,
    VOLLEYBALL;
  }

  public enum ETournamentType2 {
    FOOTBALL(100), BASKETBALL(200), VOLLEYBALL(300);
    private int value;
    ETournamentType2(int value) {
      this.value = value;
    }

    public int getValue() {
      return value;
    }
  }

}