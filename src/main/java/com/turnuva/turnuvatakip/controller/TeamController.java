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

import com.turnuva.turnuvatakip.model.Team;
import com.turnuva.turnuvatakip.respository.TeamRepository;

import io.swagger.v3.oas.annotations.tags.Tag;

@Tag(name = "Team", description = "Takım İşlemleri yapılmaktadır. Yeni Takım ekleme,silme,düzeltme ve listeleme.")
@RequestMapping("/api/team")
@RestController
public class TeamController extends _BaseController{
    @Autowired
    TeamRepository repository;

    @PreAuthorize("isAuthenticated()")
    @GetMapping("/getAll")
    public ResponseEntity<List<Team>> getAll() {
        var list = new ArrayList<Team>();
        repository.findAll().forEach(list::add);
        if (list.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(list, HttpStatus.OK);
        }
    }

    @PreAuthorize("isAuthenticated()")
    @GetMapping("/getById")
    public ResponseEntity<Team> getById(@RequestParam(required = false) Long id) {
        var modelData = repository.findById(id);
        if (modelData != null) {
            return new ResponseEntity<>(modelData.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/save")
    public ResponseEntity<Team> save(@RequestParam(required = false) Long id, @RequestBody Team model) {
        var data = repository.findById(id == null ? -1 : id);
        try {
            Team modelData;
            if (data.isPresent()) {
                modelData = data.get();
                modelData.setTeamLeader(model.getTeamLeader());
                modelData.setTeamName(model.getTeamName());
                modelData.setTournament(model.getTournament());
                repository.save(modelData);
            } else {
                var newDto = new Team(model.getTournament(), model.getTeamName(), model.getTeamLeader());
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
