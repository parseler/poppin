package com.apink.poppin.api.reservation.repository;

import com.apink.poppin.api.reservation.entity.PreReservationInfo;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PreReservationInfoRepository extends JpaRepository<PreReservationInfo, Long> {
}
