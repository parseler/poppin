package com.apink.poppin.api.popup.dto;

import lombok.*;

import java.util.Date;

@Builder
@Data
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class PreReservationResponseDTO {
    private Long preReservationId;
//    private Long userId;
    private Long popupId;
    private Date reservationDate;
    private Date reservationTime;
    private int reservationCount;
    private Date createdAt;
    private Long reservationStatementId;
}
