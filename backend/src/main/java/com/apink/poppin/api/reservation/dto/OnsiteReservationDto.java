package com.apink.poppin.api.reservation.dto;

import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OnsiteReservationDto {
    private Long onsiteReservationId;
    private Long popupId;
    private String phoneNumber;
    private LocalDate visitedDate;
    private Integer reservationStatementId;
    private Integer reservationCount;
    private Integer waitNumber;
}
