package com.apink.poppin.api.user.dto;

import com.apink.poppin.api.user.entity.UserCategory;
import com.apink.poppin.api.user.entity.UserConsent;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.util.List;

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
        private List<@Valid UserCategory> userCategories;
        private UserConsent userConsents;
    }

    @Getter
    @Builder
    public static class Response {
        private long userTsid;
        private String nickname;
        private String email;
        private String phoneNumber;
        private List<UserCategory> userCategories;
        private UserConsent userConsent;
    }

    @Getter
    @Builder
    public static class Login {
        private long userTsid;
        private String role;
        private boolean signed;
    }



}
