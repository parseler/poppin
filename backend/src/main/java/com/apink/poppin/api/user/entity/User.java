package com.apink.poppin.api.user.entity;

import jakarta.persistence.*;
import lombok.Getter;
import org.hibernate.annotations.ColumnDefault;

@Entity
@Table(name = "users")
@Getter
public class User {

    @Id
    @Column(name = "user_tsid")
    private long userTsid;

    @Column(name = "provider_id", nullable = false, unique = true)
    private String providerId;

    @Column(name = "provider_name", nullable = false)
    private String providerName;

    @Column(nullable = false)
    private String name;

    @Column(unique = true)
    private String nickname;

    @Column(unique = true)
    private String email;

    @Column(nullable = false)
    private int age;

    @Column(nullable = false)
    private String gender;

    @Column(name = "phone_number", nullable = false)
    private String phoneNumber;

    @Column(nullable = false)
    private String role;

    @Column(nullable = false)
    @ColumnDefault("img_url")
    private String img;

//    @OneToMany(mappedBy = "userCategory")
//    private List<UserCategory> userCategories = new ArrayList<>();
//
//    @OneToMany(mappedBy = "heart")
//    private List<Heart> hearts = new ArrayList<>();
//
//    @OneToMany(mappedBy = "userConsent")
//    private List<UserConsent> userConsents = new ArrayList<>():
//
//    @OneToMany(mappedBy = "preReservation")
//    private List<PreReservation> preReservations = new ArrayList<>():
//
//    @OneToMany(mappedBy = "review")
//    private List<Review> reviews = new ArrayList<>():
//
//    @OneToMany(mappedBy = "comment")
//    private List<Comment> comments = new ArrayList<>():

}
