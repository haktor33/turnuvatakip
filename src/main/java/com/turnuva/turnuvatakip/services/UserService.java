package com.turnuva.turnuvatakip.services;

import java.util.ArrayList;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.turnuva.turnuvatakip.model.User;
import com.turnuva.turnuvatakip.respository.UserRepository;

@Service
public class UserService {
    @Autowired
    UserRepository userRepository;

    public User findByUserName(String username) {
        return null;
    }

    public ArrayList<User> getAll() {
        try {
            var userlist = new ArrayList<User>();
            userRepository.findAll().forEach(userlist::add);

            if (userlist.isEmpty()) {
                return null;
            }
            return userlist;
        } catch (Exception e) {
            return null;
        }
    }

    public User getById(Long id) {
        Optional<User> userData = userRepository.findById(id);
        if (userData.isPresent()) {
            return userData.get();
        } else {
            return null;
        }
    }

    public User save(User user) {
        Optional<User> userData = null;
        if (user.getId() > 0) {
            userData = userRepository.findById(user.getId());
        }
        try {
            if (userData != null && userData.isPresent()) {
                User userModel = userData.get();
                userModel.setUserName(user.getUsername());
                userModel.setFullName(user.getFullName());
                userModel.setRole(user.getRole());
                userModel.setEmail(user.getEmail());
                userModel.setAge(user.getAge());
                return userRepository.save(userModel);
            } else {
                User userModel = userRepository
                        .save(new User(user.getUsername(), user.getFullName(), user.getRole(), user.getEmail(),
                                user.getAge(), "1"));
                return userModel;
            }
        } catch (Exception e) {
            return null;
        }
    }

    public Boolean delete(long id) {
        try {
            userRepository.deleteById(id);
            return true;
        } catch (Exception e) {
            return false;
        }
    }
}
