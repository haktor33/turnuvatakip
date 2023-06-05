package com.turnuva.turnuvatakip.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.turnuva.turnuvatakip.model.TeamPlayer;
import com.turnuva.turnuvatakip.payload.response.MessageResponse;
import com.turnuva.turnuvatakip.payload.response.TeamPlayerResponse;
import com.turnuva.turnuvatakip.respository.TeamPlayerRepository;
import com.turnuva.turnuvatakip.respository.TeamRepository;
import com.turnuva.turnuvatakip.respository.UserRepository;
import com.turnuva.turnuvatakip.security.services.UserDetailsImpl;

import io.swagger.v3.oas.annotations.tags.Tag;

@Tag(name = "Team-Player", description = "Takım oyuncuları İşlemleri yapılmaktadır. Yeni oyuncu ekleme,silme,düzeltme ve listeleme.")
@RestController
@RequestMapping("/api/team/player")
public class TeamPlayerController extends _BaseController {
    @Autowired
    TeamPlayerRepository repository;
    @Autowired
    UserRepository userRepository;
    @Autowired
    TeamRepository teamRepository;

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/getAll")
    public ResponseEntity<List<TeamPlayer>> getAll() {
        var list = new ArrayList<TeamPlayer>();
        repository.findAll().forEach(list::add);
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    @PreAuthorize("isAuthenticated()")
    @GetMapping("/getTeamPlayer")
    public ResponseEntity<List<TeamPlayerResponse>> getTeamPlayer() {
        var list = new ArrayList<TeamPlayer>();
        var response = new ArrayList<TeamPlayerResponse>();
        repository.findAll().forEach(list::add);
        list.forEach(item -> response.add(new TeamPlayerResponse(item)));
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PreAuthorize("hasRole('ROLE_TEAMLEADER') or hasRole('ADMIN')")
    @GetMapping("/getOwnTeamPlayer")
    public ResponseEntity<List<TeamPlayerResponse>> getOwnTeamPlayer() {
        var principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        var teamLeaderId = ((UserDetailsImpl) principal).getId();
        var team = teamRepository.findByTeamLeaderId(teamLeaderId);

        var list = new ArrayList<TeamPlayer>();
        var response = new ArrayList<TeamPlayerResponse>();
        repository.findByTeamId(team.getId()).forEach(list::add);
        list.forEach(item -> response.add(new TeamPlayerResponse(item)));
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PreAuthorize("hasRole('ROLE_TEAMLEADER') or hasRole('ADMIN')")
    @GetMapping("/updatePlayerStatus")
    public ResponseEntity<?> updatePlayerStatus(@RequestParam(required = true) Long playerId,
            @RequestParam(required = true) Boolean status) {
        var principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        var teamLeaderId = ((UserDetailsImpl) principal).getId();

        var player = repository.findById(playerId).get();
        var playerTeamLeader = player.getTeam().getTeamLeader().getId();

        if (playerTeamLeader != teamLeaderId) {
            return new ResponseEntity<>(new MessageResponse("Sadece kendi takiminizda degisiklik yapabilirsiniz!"),
                    HttpStatus.BAD_REQUEST);
        }
        player.setIsMain(status);
        repository.save(player);
        return new ResponseEntity<>(player, HttpStatus.OK);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/getById")
    public ResponseEntity<TeamPlayer> getById(@RequestParam(required = false) Long id) {
        var modelData = repository.findById(id);
        if (modelData != null) {
            return new ResponseEntity<>(modelData.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/save")
    public ResponseEntity<?> save(@RequestBody TeamPlayer model) {
        var user = userRepository.getById(model.getPlayer().getId());
        // 30 yas kontrolu
        if (user.getAge() < 30) {
            var ageCount = repository.getAgeLessThan30(model.getTeam().getId(), model.getId());
            if (ageCount >= 3) {
                return new ResponseEntity<>(new MessageResponse("30 yas alti 3 kisiden fazla olamaz!"),
                        HttpStatus.BAD_REQUEST);
            }
        }
        if (model.getId() <= 0) {
            // oyuncu limit kontrolu
            var team = teamRepository.findById(model.getTeam().getId());
            var playerCount = repository.countByTeam(team.get());
            var maxPlayerCount = team.get().getTournament().getMaxPlayerCount();
            if (playerCount >= maxPlayerCount) {
                return new ResponseEntity<>(
                        new MessageResponse("Bir takımda enfazla " + maxPlayerCount + " oyuncu olabilir!"),
                        HttpStatus.BAD_REQUEST);
            }
        }
        var data = repository.findById(model.getId());
        try {
            TeamPlayer modelData;
            if (data.isPresent()) {
                modelData = data.get();
                modelData.setNumber(model.getNumber());
                modelData.setPlayer(model.getPlayer());
                modelData.setTeam(model.getTeam());
                modelData = repository.save(modelData);
            } else {
                var newDto = new TeamPlayer(model.getTeam(), model.getPlayer(), model.getNumber());
                modelData = repository.save(newDto);
            }
            return new ResponseEntity<>(modelData, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(new MessageResponse(e.getLocalizedMessage()), HttpStatus.BAD_REQUEST);
        }
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<HttpStatus> delete(@PathVariable("id") long id) {
        try {
            repository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
