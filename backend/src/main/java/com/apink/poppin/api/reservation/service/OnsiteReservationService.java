package com.apink.poppin.api.reservation.service;

import com.apink.poppin.api.reservation.dto.OnsiteReservationDto;

public interface OnsiteReservationService {
    void saveToRedis(OnsiteReservationDto onsiteReservationDto);
    OnsiteReservationDto getFromRedis(String phoneNumber, Long popupId);
}
