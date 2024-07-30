package com.apink.poppin.api.user.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;

@Entity
@Table(name = "user")
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
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
    private String age;

    @Column(nullable = false)
    private String gender;

    @Column(name = "phone_number", nullable = false)
    private String phoneNumber;

    @Column(nullable = false)
    private String role;

    @Column(nullable = false)
    @ColumnDefault("'img_url'")
    private String img;

    @Column(nullable = false)
    @ColumnDefault("true")
    private boolean state;

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
