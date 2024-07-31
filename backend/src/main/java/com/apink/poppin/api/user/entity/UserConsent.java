package com.apink.poppin.api.user.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import org.hibernate.annotations.ColumnDefault;

import java.time.Instant;

@Getter
@Entity
@Table(name = "user_consent")
public class UserConsent {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_consent_id", nullable = false)
    private Integer id;

    @NotNull
    @OneToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_tsid", nullable = false)
    private User user;

    @NotNull
    @ColumnDefault("0")
    @Column(name = "marketing_consent", nullable = false)
    private Byte marketingConsent;

    @NotNull
    @ColumnDefault("0")
    @Column(name = "event_push_consent", nullable = false)
    private Byte eventPushConsent;

    @ColumnDefault("CURRENT_TIMESTAMP")
    @Column(name = "updated_at")
    private Instant updatedAt;

}