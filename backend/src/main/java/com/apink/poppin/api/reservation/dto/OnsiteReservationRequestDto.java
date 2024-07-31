package com.apink.poppin.api.reservation.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class OnsiteReservationRequestDto {
    private Long onsiteReservationId;
    private Long popupId;
    private String phoneNumber;
    private Long reservationStatementId;
}
