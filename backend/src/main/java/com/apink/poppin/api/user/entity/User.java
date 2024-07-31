package com.apink.poppin.api.user.entity;

import com.apink.poppin.api.heart.entity.Heart;
import com.apink.poppin.api.reservation.entity.PreReservation;
import com.apink.poppin.api.review.entity.Comment;
import com.apink.poppin.api.review.entity.Review;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;

import java.util.ArrayList;
import java.util.List;

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

    @OneToMany(mappedBy = "user")
    private List<UserCategory> userCategories = new ArrayList<>();

    @OneToMany(mappedBy = "user")
    private List<Heart> hearts = new ArrayList<>();

    @OneToOne(mappedBy = "user")
    private UserConsent userConsents;

    @OneToMany(mappedBy = "user")
    private List<PreReservation> preReservations = new ArrayList<>();

    @OneToMany(mappedBy = "user")
    private List<Review> reviews = new ArrayList<>();

    @OneToMany(mappedBy = "user")
    private List<Comment> comments = new ArrayList<>();

}
