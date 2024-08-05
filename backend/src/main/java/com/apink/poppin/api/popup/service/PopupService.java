package com.apink.poppin.api.popup.service;

import com.apink.poppin.api.popup.dto.PopupDTO;
import com.apink.poppin.api.popup.dto.PopupRequestDTO;
import com.apink.poppin.api.popup.entity.Popup;
import com.apink.poppin.api.reservation.dto.PreReservationRequestDTO;
import com.apink.poppin.api.reservation.dto.PreReservationResponseDTO;
import com.apink.poppin.api.reservation.dto.PreStatementRequestDTO;
import com.apink.poppin.api.reservation.dto.PreStatementResponseDTO;
import com.apink.poppin.api.reservation.entity.PreReservation;

import java.util.Date;
import java.util.List;

public interface PopupService {

    // 전체 팝업 목록 조회 및 검색
    List<PopupDTO> getPopupList(String keyword);


    // 팝업 상세 조회
    PopupDTO getPopup(Long popupId);

    // 인기 팝업 조회
    List<PopupDTO> getPopupRank();

    // 유사 팝업 조회
//    List<PopupDTO> getSimilarPopup(long popupId);

    // 오픈 예정 팝업 조회
    List<PopupDTO> getOpenPopup();

    // 사전 예약
    PreReservation createPreReservation(PreReservationRequestDTO req);

    // 날짜 별 사전예약 정보
    List<PreReservationResponseDTO> getPreReservationsByDate(Date reservationDate);

    // 사전 예약 상태 정보 변경하기
    PreStatementResponseDTO changePreReservation(PreStatementRequestDTO reqDto);

    // 팝업 등록 (사전 예약 없이)
    Popup createPopupOnly(PopupRequestDTO popupDto);

    // 팝업 등록 (사전 예약까지)
    void createPopupWithPreReservation(PopupRequestDTO popupDto);

    // 팝업 수정
    Popup updatePopup(PopupRequestDTO popupDto, long popupId);

    // 팝업 삭제
    void deletePopup(long popupId);

}
