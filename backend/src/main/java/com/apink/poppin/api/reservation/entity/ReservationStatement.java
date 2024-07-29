package com.apink.poppin.api.reservation.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;

@Getter
@Entity
@Table(name = "reservation_statement")
public class ReservationStatement {

    @Id
    @NotNull
    @Column(nullable = false)
    private Long reservationStatementId;

    @NotNull
    @Size(max = 16)
    @Column(nullable = false, length = 16)
    private String reservationStatementName;
}