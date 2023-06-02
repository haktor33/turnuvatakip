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

import com.turnuva.turnuvatakip.customQueries.IScoreBoard;
import com.turnuva.turnuvatakip.model.TeamMatch;
import com.turnuva.turnuvatakip.respository.TeamMatchRepository;

@RestController
@RequestMapping("/api/team/match")
public class TeamMatchController {
    @Autowired
    TeamMatchRepository repository;

    @PreAuthorize("isAuthenticated()")
    @GetMapping("/getAll")
    public ResponseEntity<List<TeamMatch>> getAll() {
        var list = new ArrayList<TeamMatch>();
        repository.findAll().forEach(list::add);
        if (list.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(list, HttpStatus.OK);
        }
    }

    @PreAuthorize("isAuthenticated()")
    @GetMapping("/getScoreBoard")
    public ResponseEntity<List<IScoreBoard>> getScoreBoard() {
        var list = new ArrayList<IScoreBoard>();
        repository.getScoreBoard().forEach(list::add);
        if (list.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(list, HttpStatus.OK);
        }
    }

    @PreAuthorize("isAuthenticated()")
    @GetMapping("/getById")
    public ResponseEntity<TeamMatch> getById(@RequestParam(required = false) Long id) {
        var modelData = repository.findById(id);
        if (modelData != null) {
            return new ResponseEntity<>(modelData.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/save")
    public ResponseEntity<TeamMatch> save(@RequestParam(required = false) Long id, @RequestBody TeamMatch model) {
        var data = repository.findById(id == null ? -1 : id);
        try {
            TeamMatch modelData;
            if (data.isPresent()) {
                modelData = data.get();
                modelData.setTeam1(model.getTeam1());
                modelData.setTeam2(model.getTeam2());
                modelData.setScore(model.getScore());
                repository.save(modelData);
            } else {
                var newDto = new TeamMatch(model.getTeam1(), model.getTeam2(), model.getScore());
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
