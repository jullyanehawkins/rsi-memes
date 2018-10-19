package com.rsi.memegenerator.repository;

import com.rsi.memegenerator.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource
public interface UserRepository extends JpaRepository<User, Long>, UserEmailRepository {
}
