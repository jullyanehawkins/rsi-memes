package com.rsi.memegenerator.controller;

import com.rsi.memegenerator.model.User;
import com.rsi.memegenerator.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
@RequestMapping("/sign-up")
@CrossOrigin(origins = "http://localhost:4200")
public class UserSignupController {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping
    ResponseEntity addNewUser(@RequestParam String email, @RequestParam String password) {

        if (userRepository.findByEmail(email) == null) {
            User newUser = new User();
            newUser.setEmail(email);
            newUser.setPassword(passwordEncoder.encode(password));
            userRepository.save(newUser);
            System.out.println(newUser);
            return ResponseEntity.ok("account created");
        }
        return ResponseEntity.status(HttpStatus.CONFLICT).body("email conflict");
    }
}
