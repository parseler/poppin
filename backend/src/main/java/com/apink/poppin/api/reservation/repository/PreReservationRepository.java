package com.apink.poppin.api.reservation.repository;

import com.apink.poppin.api.reservation.entity.PreReservation;
import com.apink.poppin.api.reservation.entity.ReservationStatement;
import com.apink.poppin.api.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface PreReservationRepository extends JpaRepository<PreReservation, Long> {

    // 날짜 별 사전 예약 정보
    List<PreReservation> findAllByReservationDate(Date reservationDate);

    List<PreReservation> findByUser(User user);

    List<PreReservation> findByUserAndReservationStatement_ReservationStatementId(User user, int reservationStatementId);

}
