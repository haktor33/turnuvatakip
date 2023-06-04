package com.turnuva.turnuvatakip.payload.response;

import com.turnuva.turnuvatakip.model.TeamPlayer;

public class TeamPlayerResponse {
	public TeamPlayerResponse(TeamPlayer player) {
		this.setId(player.getId());
		this.setIsMain(player.getIsMain());
		this.setTeamName(player.getTeam().getTeamName());
		this.setPlayerName(player.getPlayer().getFullName());
		this.setPlayerNumber(player.getNumber());
	}

	private long id;
	private String teamName;
	private String playerName;
	private String playerNumber;
	private Boolean isMain = false;

	public String getTeamName() {
		return teamName;
	}

	public void setTeamName(String teamName) {
		this.teamName = teamName;
	}

	public String getPlayerName() {
		return playerName;
	}

	public void setPlayerName(String playerName) {
		this.playerName = playerName;
	}

	public String getPlayerNumber() {
		return playerNumber;
	}

	public void setPlayerNumber(String playerNumber) {
		this.playerNumber = playerNumber;
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public Boolean getIsMain() {
		return isMain;
	}

	public void setIsMain(Boolean isMain) {
		this.isMain = isMain;
	}

}
