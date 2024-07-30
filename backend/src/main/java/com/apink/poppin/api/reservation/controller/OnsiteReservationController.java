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

    @GetMapping("/{phoneNumber}/{popupId}")
    public ResponseEntity<?> getOnsiteReservation(@PathVariable String phoneNumber, @PathVariable Long popupId) {
        OnsiteReservationDto onsiteReservationDto = onsiteReservationService.getFromRedis(phoneNumber, popupId);

        if (onsiteReservationDto == null) {
            return ResponseEntity.notFound().build();
        } else {
            return ResponseEntity.ok(onsiteReservationDto);
        }
    }

    @PostMapping
    public ResponseEntity<?> createOnsiteReservation(@RequestBody OnsiteReservationDto onsiteReservationDto) {
        onsiteReservationService.saveToRedis(onsiteReservationDto);

        return ResponseEntity.ok().build();
    }
}
