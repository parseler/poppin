package com.apink.poppin.api.reservation.service;

import com.apink.poppin.api.reservation.dto.OnsiteReservationDto;
import com.apink.poppin.api.reservation.dto.OnsiteReservationRequestDto;

import java.util.List;

public interface OnsiteReservationService {
    OnsiteReservationDto createOnsiteReservation(OnsiteReservationDto onsiteReservationDto);

    OnsiteReservationDto getOnsiteReservationByKakaoLink(long onsiteReservationId, long popupId);

    OnsiteReservationDto getOnsiteReservationByPhoneNumber(String phoneNumber);

    OnsiteReservationDto changeOnsiteReservation(OnsiteReservationRequestDto onsiteReservationRequestDto);

    List<OnsiteReservationDto> getOnsiteReservations(long popupId);
}
