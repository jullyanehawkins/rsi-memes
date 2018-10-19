package com.rsi.memegenerator.constants;

public enum City {
    ABQ("Albuquerque, NM"),
    MOBILE("Mobile, AB"),
    AUGUSTA("Augusta, GA"),
    JONESBORO("Jonesboro, AR");

    private String location;

    City(String location) {
        this.location = location;
    }

    @Override
    public String toString() {
        return location;
    }
}
