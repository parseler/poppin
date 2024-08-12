package com.apink.poppin.api.user.dto;

import com.apink.poppin.api.user.entity.UserCategory;
import com.apink.poppin.api.user.entity.UserConsent;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.deser.std.NumberDeserializers;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;
import org.springframework.web.multipart.MultipartFile;

import java.time.Instant;
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
        private String email;
        @NotBlank
        private String phoneNumber;
        @Size(max = 3, message = "카테고리는 최대 3개까지만 선택할 수 있습니다.")
        private List<UserDto.Category> userCategories;
        @NotNull
        private Consent userConsents;
        @NotBlank
        private String role;
        @NotBlank
        private MultipartFile img;

    }

    @Getter
    @Builder
    public static class Category {
        private String name;
    }

    @Getter
    @Builder
    public static class Consent {
        private Boolean marketingConsent;
        private Boolean servicePushConsent;
        private Instant marketingUpdatedAt;
        private Instant serviceUpdatedAt;
    }

    @Getter
    @Builder
    public static class Response {

        private String userTsid;
        private String nickname;
        private String email;
        private String img;
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
