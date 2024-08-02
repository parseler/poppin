package com.apink.poppin.api.reservation.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;
import java.time.LocalTime;

@Getter
@Builder
@AllArgsConstructor
public class ReservationResponseDto {

    private long reservationId;
    private String title;
    private String userName;
    private LocalDate created_at;
    private LocalDate reservationDate;
    private LocalTime reservationTime;
    private Integer reservationCount;
    private long reservationStatement;

}
