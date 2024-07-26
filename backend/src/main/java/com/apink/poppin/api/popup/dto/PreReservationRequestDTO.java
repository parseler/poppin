package com.apink.poppin.api.popup.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PreReservationRequestDTO {
//    private Long userId;
    private Long popupId;
    private Date reservationDate;
    private Date reservationTime;
    private int reservationCount;
    private Long reservationStatementId;
}
