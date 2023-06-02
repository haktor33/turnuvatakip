package com.turnuva.turnuvatakip.respository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import com.turnuva.turnuvatakip.model.User;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String userName);
    User getById(Long id);
    Boolean existsByUsername(String username);
    Boolean existsByEmail(String email);
}
