package com.apink.poppin.api.reservation.repository;

import com.apink.poppin.api.reservation.dto.ReservationResponseDto;
import com.apink.poppin.api.reservation.entity.PreReservation;
import com.apink.poppin.api.reservation.entity.ReservationStatement;
import com.apink.poppin.api.user.entity.User;
import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface PreReservationRepository extends JpaRepository<PreReservation, Long> {

    // 날짜 별 사전 예약 정보
    List<PreReservation> findAllByReservationDate(Date reservationDate);

    List<PreReservation> findByUser(User user);

    List<PreReservation> findByUserAndReservationStatement_ReservationStatementId(User user, int reservationStatementId);

    @Query("SELECT new com.apink.poppin.api.reservation.dto.ReservationResponseDto(" +
            "pr.preReservationId, p.name, u.name, pi.img, pr.createdAt, pr.reservationDate, " +
            "pr.reservationTime, pr.reservationCount, rs.reservationStatementId) " +
            "FROM PreReservation pr " +
            "JOIN pr.popup p " +
            "JOIN pr.user u " +
            "JOIN pr.reservationStatement rs " +
            "LEFT JOIN PopupImage pi ON pi.popup.popupId = p.popupId AND pi.seq = 1 " +
            "WHERE u.userTsid = :userTsid")
    List<ReservationResponseDto> findReservationsByUserTsid(@Param("userTsid") long userTsid);
}