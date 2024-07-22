package com.apink.poppin.api.reservation.repository;

import com.apink.poppin.api.reservation.entity.OnsiteReservation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OnsiteReservationRepository extends JpaRepository<OnsiteReservation, Long> {

}
