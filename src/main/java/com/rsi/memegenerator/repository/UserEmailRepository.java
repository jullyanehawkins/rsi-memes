package com.rsi.memegenerator.repository;

import com.rsi.memegenerator.model.User;


public interface UserEmailRepository {
    User findByEmail(String email);
}
