package com.rsi.memegenerator.controller;

import com.rsi.memegenerator.model.User;
import com.rsi.memegenerator.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

@RequestMapping("/login")
public class UserLoginRepository {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;

//    @PostMapping
//    ResponseEntity signinUser(@RequestBody String email, @RequestBody String password) {
//        User user = userRepository.findByEmail(email);
//        if (user != null && user.) {
//            User user = new User();
//            return user;
//        }
//        ResponseEntity.status(HttpStatus.CONFLICT).body("check");
//    }
}
