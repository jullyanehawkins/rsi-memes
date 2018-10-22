package com.rsi.memegenerator;

import com.rsi.memegenerator.model.User;
import com.rsi.memegenerator.repository.UserRepository;

import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.stream.Stream;

@SpringBootApplication
//@EnableJpaRepositories
public class MemeGeneratorApplication {

    public static void main(String... args) {
        SpringApplication.run(MemeGeneratorApplication.class, args);
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    ApplicationRunner init(UserRepository repository) {
        return args -> {
            Stream.of("Mauricio Monsivais mmonsivais@rsi.com", "Arris Walker awalker@rsi.com", "Andrew Morin amoring@rsi.com")
                    .forEach(name -> {
                        String[] contents = name.split(" ");
                        User user = new User();
                        user.setFirstName(contents[0]);
                        user.setLastName(contents[1]);
                        user.setEmail(contents[2]);
                        repository.save(user);
                    });
            repository.findAll().forEach(System.out::println);
        };
    }
}
