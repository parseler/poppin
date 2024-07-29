package com.apink.poppin.api.reservation.dto;

import lombok.*;

import java.util.Date;

@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class PreReservationResponseDTO {
    private Long preReservationId;
    private Long userTsid;
    private Long popupId;
    private Date reservationDate;
    private Date reservationTime;
    private int reservationCount;
    private Date createdAt;
    private Long reservationStatementId;
}
