package com.apink.poppin;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "user")
// 테스트용
public class User {
    @Id
    @Column(name = "user_tsid", nullable = false)
    private Long userTsid;

    @Size(max = 100)
    @NotNull
    @Column(name = "provider_id", nullable = false, length = 100)
    private String providerId;

    @Size(max = 45)
    @NotNull
    @Column(name = "provider_name", nullable = false, length = 45)
    private String providerName;

    @Size(max = 30)
    @NotNull
    @Column(name = "name", nullable = false, length = 30)
    private String name;

    @Size(max = 50)
    @Column(name = "nickname", length = 50)
    private String nickname;

    @Size(max = 255)
    @Column(name = "email")
    private String email;

    @NotNull
    @Column(name = "age", nullable = false)
    private Integer age;

    @Size(max = 5)
    @NotNull
    @Column(name = "gender", nullable = false, length = 5)
    private String gender;

    @Size(max = 16)
    @NotNull
    @Column(name = "phone_number", nullable = false, length = 16)
    private String phoneNumber;

    @Size(max = 20)
    @NotNull
    @Column(name = "role", nullable = false, length = 20)
    private String role;

    @Size(max = 255)
    @Column(name = "img")
    private String img;

}