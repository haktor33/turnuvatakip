package com.turnuva.turnuvatakip.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.turnuva.turnuvatakip.model.TeamPlayer;
import com.turnuva.turnuvatakip.payload.response.TeamPlayerResponse;
import com.turnuva.turnuvatakip.respository.TeamPlayerRepository;

import io.swagger.v3.oas.annotations.tags.Tag;

@Tag(name = "Team-Player", description = "Takım oyuncuları İşlemleri yapılmaktadır. Yeni oyuncu ekleme,silme,düzeltme ve listeleme.")
@RestController
@RequestMapping("/api/team/player")
public class TeamPlayerController extends _BaseController {
    @Autowired
    TeamPlayerRepository repository;

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/getAll")
    public ResponseEntity<List<TeamPlayer>> getAll() {
        var list = new ArrayList<TeamPlayer>();
        repository.findAll().forEach(list::add);
        if (list.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(list, HttpStatus.OK);
        }
    }

    @PreAuthorize("isAuthenticated()")
    @GetMapping("/getTeamPlayer")
    public ResponseEntity<List<TeamPlayerResponse>> getTeamPlayer() {
        var list = new ArrayList<TeamPlayer>();
        var response = new ArrayList<TeamPlayerResponse>();
        repository.findAll().forEach(list::add);
        list.forEach(item -> response.add(new TeamPlayerResponse(item)));

        if (response.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(response, HttpStatus.OK);
        }
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
    public ResponseEntity<TeamPlayer> save(@RequestParam(required = false) Long id, @RequestBody TeamPlayer model) {
        var data = repository.findById(id == null ? -1 : id);
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
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);

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
