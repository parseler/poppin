package com.apink.poppin.api.popup.repository;

import com.apink.poppin.api.manager.entity.Manager;
import com.apink.poppin.api.popup.entity.Popup;
import com.apink.poppin.api.reservation.dto.ReservationResponseDto;
import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface PopupRepository extends JpaRepository<Popup, Long> {

    // 전체 목록 조회 및 검색
    List<Popup> findAllByNameContaining(String keyword);

    // 인기 팝업 조회
    List<Popup> findAllByOrderByHeartDesc();

    // 유사 팝업 조회

    // 오픈 예정 팝업 조회
    List<Popup> findAllByStartDateAfter(LocalDate now);

    @Query("SELECT new com.apink.poppin.api.reservation.dto.ReservationResponseDto(" +
            "p.name, pi.img) " +
            "FROM Popup p " +
            "LEFT JOIN PopupImage pi ON pi.popup.popupId = p.popupId AND pi.seq = 1 " +
            "WHERE p.popupId = :popupId")
    ReservationResponseDto findPopupNameAndFirstImageByPopupId(@Param("popupId") Long popupId);

    // 본인이 등록한 팝업 목록 조회 (매니저)
    List<Popup> findAllByManager(Manager manager);

    // 끝난 팝업 제외한 전체 팝업 가져오기
    List<Popup> findAllByEndDateAfter(LocalDate now);

}
