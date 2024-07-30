package com.apink.poppin.api.reservation.service;

import com.apink.poppin.api.reservation.dto.OnsiteReservationDto;

public interface OnsiteReservationService {
    OnsiteReservationDto createOnsiteReservation(OnsiteReservationDto onsiteReservationDto);
    OnsiteReservationDto getOnsiteReservationByKakaoLink(long onsiteReservationId, long popupId);
    OnsiteReservationDto getOnsiteReservationByPhoneNumber(String phoneNumber);
}
