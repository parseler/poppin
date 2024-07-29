package com.apink.poppin.api.popup.entity;

import com.apink.poppin.api.reservation.entity.ReservationStatement;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.util.Date;

import static jakarta.persistence.FetchType.LAZY;

@Builder
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name="pre_reservation")
public class PreReservation {
    // 사전 예약

    @Id
    @GeneratedValue
    private Long preReservationId;

//    @ManyToOne(fetch = LAZY)
//    @JoinColumn(name = "user_id", nullable = false)
//    private Member member;

    @OneToOne(fetch = LAZY)
    @JoinColumn(name = "popup_id", nullable = false)
    private Popup popup;

    @NotNull
    private Date reservationDate;

    @NotNull
    private Date reservationTime;

    @NotNull
    private int reservationCount;

    @CreationTimestamp
    private Date createdAt;

    @OneToOne(fetch = LAZY)
    @JoinColumn(name = "reservation_statement_id", nullable = false)
    private ReservationStatement reservationStatement;


}
