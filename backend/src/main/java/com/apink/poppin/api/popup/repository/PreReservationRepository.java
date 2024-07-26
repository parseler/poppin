package com.apink.poppin.api.popup.repository;

import com.apink.poppin.api.popup.entity.PreReservation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface PreReservationRepository extends JpaRepository<PreReservation, Long> {

    // 날짜 별 사전 예약 정보
    List<PreReservation> findAllByReservationDate(Date reservationDate);

}
