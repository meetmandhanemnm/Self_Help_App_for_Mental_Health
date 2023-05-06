package com.had.selfhelp.entity;

public class payload {
    Doctor d;

    String token;

    public Doctor getD() {
        return d;
    }

    public void setD(Doctor d) {
        this.d = d;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public payload(Doctor d, String token) {
        this.d = d;
        this.token = token;
    }
}
