package com.apink.poppin.api.reservation.controller;

import com.apink.poppin.api.reservation.dto.OnsiteReservationDto;
import com.apink.poppin.api.reservation.service.OnsiteReservationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/onsite-reservations")
@RequiredArgsConstructor
public class OnsiteReservationController {

    private final OnsiteReservationService onsiteReservationService;

    @PostMapping
    public ResponseEntity<?> createOnsiteReservation(@RequestBody OnsiteReservationDto onsiteReservationDto) {
        OnsiteReservationDto completed = onsiteReservationService.createOnsiteReservation(onsiteReservationDto);

        return ResponseEntity.ok().body(completed);
    }

    @GetMapping("/{onsiteReservationId}/popups/{popupId}")
    public ResponseEntity<?> getOnsiteReservationByKakaoLink(@PathVariable Long onsiteReservationId, @PathVariable Long popupId) {
        OnsiteReservationDto onsite = onsiteReservationService.getOnsiteReservationByKakaoLink(onsiteReservationId, popupId);

        return ResponseEntity.ok(onsite);
    }

    @GetMapping("/{phoneNumber}")
    public ResponseEntity<?> getOnsiteReservationByPhoneNumber(@PathVariable String phoneNumber) {
        OnsiteReservationDto onsiteReservationDto = onsiteReservationService.getOnsiteReservationByPhoneNumber(phoneNumber);

        return ResponseEntity.ok().body(onsiteReservationDto);
    }
}
