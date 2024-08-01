package com.apink.poppin.common.scheduler;

import com.apink.poppin.api.reservation.service.OnsiteReservationService;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class ScheduleTask {

    private final OnsiteReservationService onsiteReservationService;

    @Scheduled(cron = "0 0 3 * * ?")
    public void saveOnsiteReservations() {
        onsiteReservationService.saveOnsiteReservations();
    }
}
