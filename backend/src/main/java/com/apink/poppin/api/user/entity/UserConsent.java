package com.apink.poppin.api.user.entity;

import com.apink.poppin.api.user.dto.UserDto;
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
    private Boolean marketingConsent;

    @NotNull
    @ColumnDefault("0")
    @Column(name = "service_push_consent", nullable = false)
    private Boolean servicePushConsent;

    @ColumnDefault("CURRENT_TIMESTAMP")
    @Column(name = "marketing_updated_at")
    private Instant marketingUpdatedAt;

    @ColumnDefault("CURRENT_TIMESTAMP")
    @Column(name = "service_updated_at")
    private Instant serviceUpdatedAt;

    public void updateUserConsent(UserConsent userConsent) {
        if(this.marketingConsent != userConsent.marketingConsent) {
            this.marketingConsent = userConsent.marketingConsent;
            this.marketingUpdatedAt = Instant.now();
        }

        if(this.servicePushConsent != userConsent.servicePushConsent) {
            this.servicePushConsent = userConsent.servicePushConsent;
            this.serviceUpdatedAt = Instant.now();
        }
    }

}