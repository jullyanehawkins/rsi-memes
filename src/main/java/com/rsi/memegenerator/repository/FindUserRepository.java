package com.rsi.memegenerator.repository;

import com.rsi.memegenerator.model.User;


public interface FindUserRepository {
    User findByEmail(String email);
}