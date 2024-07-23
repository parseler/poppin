package com.apink.poppin.api.user.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

public class UserDto {

    @Getter
    @Setter
    @Builder
    public static class Put {
        @NotBlank
        private String nickname;
        @NotBlank
        private String img;
//        private List<@Valid UserConsent> userConsents;
    }

    @Getter
    @Builder
    public static class Response {
        private long tsid;
        private String nickname;
        private String email;
        private String phoneNumber;
//        private List<@Valid UserCategory> userCategories;
    }



}
