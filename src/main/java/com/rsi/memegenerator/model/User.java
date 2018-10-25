package com.rsi.memegenerator.model;

import lombok.*;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Data
@Entity
@NoArgsConstructor
public class User {
    private @Id
    @GeneratedValue
    Long uuid; //= java.util.UUID.randomUUID();
    private @NonNull
    String email;
    private @NonNull
    String password;

    @Override
    public String toString() {
        return uuid.toString() + ": email=\"" + email + "\"";
    }
}
