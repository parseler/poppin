package com.apink.poppin.api.user.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;

public class UserDto {

    @Getter
    @Builder
    public static class Put {
        @NotNull
        private long userTsid;
        @NotBlank
        private String nickname;
        @NotBlank
        private String img;
//        private List<@Valid UserConsent> userConsents;
    }

    @Getter
    @Builder
    public static class Response {
        private long userTsid;
        private String nickname;
        private String email;
        private String phoneNumber;
//        private List<@Valid UserCategory> userCategories;
    }

    @Getter
    @Builder
    public static class Login {
        private long userTsid;
        private String role;
    }



}
