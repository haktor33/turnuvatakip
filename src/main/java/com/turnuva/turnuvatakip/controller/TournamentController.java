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

import com.turnuva.turnuvatakip.model.Tournament;
import com.turnuva.turnuvatakip.payload.response.MessageResponse;
import com.turnuva.turnuvatakip.respository.TournamentRepository;

import io.swagger.v3.oas.annotations.tags.Tag;

@Tag(name = "Tournament", description = "Turnuva ait İşlemler yapılmaktadır. Yeni turnuva ekleme,silme,düzeltme ve listeleme.")
@RestController
@RequestMapping("/api/tournament")
public class TournamentController extends _BaseController {
    @Autowired
    TournamentRepository repository;

    @PreAuthorize("isAuthenticated()")
    @GetMapping("/getAll")
    public ResponseEntity<List<Tournament>> getAll() {
        var list = new ArrayList<Tournament>();
        repository.findAll().forEach(list::add);
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/getById")
    public ResponseEntity<Tournament> getById(@RequestParam(required = false) Long id) {
        var modelData = repository.findById(id);
        if (modelData != null) {
            return new ResponseEntity<>(modelData.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/save")
    public ResponseEntity<?> save(@RequestBody Tournament model) {
        var data = repository.findById(model.getId());
        Tournament modelData;
        try {
            if (data.isPresent()) {
                modelData = data.get();
                modelData.setYear(model.getYear());
                modelData.setTypeValue(model.getTypeValue());
                modelData.setMaxPlayerCount(model.getMaxPlayerCount());
                repository.save(modelData);
                return new ResponseEntity<>(modelData, HttpStatus.OK);
            } else {
                Tournament newDto = new Tournament(model.getYear(), model.getTypeValue(),model.getMaxPlayerCount());
                modelData = repository.save(newDto);
            }
            return new ResponseEntity<>(modelData, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(new MessageResponse(e.getLocalizedMessage()), HttpStatus.BAD_REQUEST);
        }
    }

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
