package com.rsi.memegenerator.exception;


public class UserNotFoundException extends Exception {
    public UserNotFoundException(long id) {
        super("User " + id + " not found");
    }
}
