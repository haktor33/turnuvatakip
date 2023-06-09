package com.turnuva.turnuvatakip.controller;

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

import com.turnuva.turnuvatakip.model.User;
import com.turnuva.turnuvatakip.payload.response.MessageResponse;
import com.turnuva.turnuvatakip.services.UserService;

import io.swagger.v3.oas.annotations.tags.Tag;

@Tag(name = "User", description = "Kişiye ait İşlemler yapılmaktadır. Yeni kişi ekleme,silme,düzeltme ve listeleme.")
@RestController
@RequestMapping("/api/user")
public class UserController extends _BaseController {
    @Autowired
    UserService userService;

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/findByUsername")
    public ResponseEntity<User> findByUserName(@RequestParam(required = false) String username) {
        var userData = userService.findByUserName(username);
        return new ResponseEntity<>(userData, HttpStatus.OK);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/getAll")
    public ResponseEntity<List<User>> getAll() {
        var userlist = userService.getAll();
        if (userlist == null) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        } else {
            return new ResponseEntity<>(userlist, HttpStatus.OK);
        }
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/getById")
    public ResponseEntity<User> getById(@RequestParam(required = false) Long id) {
        var userData = userService.getById(id);
        if (userData != null) {
            return new ResponseEntity<>(userData, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/save")
    public ResponseEntity<?> save(@RequestBody User user) {
        var userData = userService.save(user);
        try {
            return new ResponseEntity<>(userData, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(new MessageResponse(e.getLocalizedMessage()), HttpStatus.BAD_REQUEST);
        }
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<HttpStatus> delete(@PathVariable("id") long id) {
        var isOk = userService.delete(id);
        return new ResponseEntity<>(isOk ? HttpStatus.NO_CONTENT : HttpStatus.INTERNAL_SERVER_ERROR);
    }

}
