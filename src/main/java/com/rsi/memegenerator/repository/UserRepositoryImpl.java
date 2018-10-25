package com.rsi.memegenerator.repository;

import com.rsi.memegenerator.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;

public class UserRepositoryImpl implements UserEmailRepository {
    @Autowired
    private UserRepository userRepository;

    @Override
    public User findByEmail(String email) {
        List<User> allUsers = userRepository.findAll();
        for (User u : allUsers) { //@todo EXTREMELY INEFFICIENT
            if (u.getEmail().equals(email))
                return u;
        }
        return null;
    }
}
