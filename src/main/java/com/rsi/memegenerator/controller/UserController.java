package com.rsi.memegenerator.controller;

import com.rsi.memegenerator.exception.UserNotFoundException;
import com.rsi.memegenerator.model.User;
import com.rsi.memegenerator.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
public class UserController {
    @Autowired
    private UserRepository userRepository;


//    @GetMapping
//    public List<User> all() {
//        return userRepository.findAll();
//    }

    @GetMapping("{id}")
    User getUser(@PathVariable long id) throws UserNotFoundException {
        return userRepository.findById(id).orElseThrow(() -> new UserNotFoundException(id));
    }

//    @DeleteMapping("/{id}")
//    void deleteUser(@PathVariable long id) {
//        userRepository.deleteById(id);
//    }

    @PostMapping
    User addUser(@RequestBody User newUser) {
        return userRepository.save(newUser);
    }

//    @PutMapping
//    User replaceUser(@RequestBody User newUser, @PathVariable Long id) {
//        return userRepository.findById(id)
//                .map(user -> {
//                    user.setFirstName(newUser.getFirstName());
//                    user.setLastName(newUser.getLastName());
//                    return userRepository.save(user);
//                })
//                .orElseGet(() -> {
//                    newUser.setUuid(id);
//                    return userRepository.save(newUser);
//                });
//    }
}