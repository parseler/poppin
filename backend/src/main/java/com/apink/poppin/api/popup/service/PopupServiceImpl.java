package com.apink.poppin.api.popup.service;

import com.apink.poppin.api.popup.dto.PopupDTO;
import com.apink.poppin.api.popup.dto.PreReservationRequestDTO;
import com.apink.poppin.api.popup.dto.PreReservationResponseDTO;
import com.apink.poppin.api.popup.entity.Popup;
import com.apink.poppin.api.popup.entity.PreReservation;
import com.apink.poppin.api.popup.repository.PopupRepository;
import com.apink.poppin.api.popup.repository.PreReservationRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class PopupServiceImpl implements PopupService {

    @Autowired
    private PopupRepository popupRepository;

    @Autowired
    private PreReservationRepository preReservationRepository;

    // 팝업 전체 목록 조회 및 검색
    public List<PopupDTO> getPopupList(String keyword) {
        List<Popup> popups = popupRepository.findAllByNameContaining(keyword);
        return popups.stream()
                .map(popup -> new PopupDTO(popup.getPopupId(), popup.getName(), popup.getStartDate(), popup.getEndDate()))
                .collect(Collectors.toList());
    }

    // 팝업 상세 조회
    public PopupDTO getPopup(Long popupId) {
        Popup popup = popupRepository.findById(popupId)
                .orElseThrow(() -> new IllegalArgumentException("Invalid popup ID"));
        return new PopupDTO(popup.getPopupId(), popup.getName(), popup.getStartDate(), popup.getEndDate());
    }

    // 인기 팝업 조회
//    public List<PopupDTO> getPopupRank() {
//
//    }

    // 유사 팝업 조회
//    public List<PopupDTO> getSimilarPopup(long popupId) {
//
//    }

    // 오픈 예정 팝업 조회
    public List<PopupDTO> getOpenPopup() {
        LocalDateTime now = LocalDateTime.now();
        List<Popup> popups = popupRepository.findAllByStartDateAfter(now);
        return popups.stream()
                .map(popup -> new PopupDTO(popup.getPopupId(), popup.getName(), popup.getStartDate(), popup.getEndDate()))
                .collect(Collectors.toList());
    }

    // 사전 예약
    @Override
    @Transactional
    public PreReservation createPreReservation(PreReservationRequestDTO req) {
        // 유저 확인
//        Member member = memberRepository.findById(req.getUserId())
//                .orElseThrow(() -> new IllegalArgumentException("Invalid user ID"));
        // 팝업 확인
        Popup popup = popupRepository.findById(req.getPopupId())
                .orElseThrow(() -> new IllegalArgumentException("Invalid popup ID"));
        // 예약 상태 확인 ?
//        ReservationStatement reservationStatement = reservationStatementRepository.findById(req.getReservationStatementId())
//                .orElseThrow(() -> new IllegalArgumentException("Invalid reservation statement ID"));

        PreReservation preReservation = PreReservation.builder()
//                .user(user)
                .popup(popup)
                .reservationDate(req.getReservationDate())
                .reservationTime(req.getReservationTime())
                .reservationCount(req.getReservationCount())
//                .reservationStatement(reservationStatement)
                .build();

        return preReservationRepository.save(preReservation);
    }

    // 날짜 별 사전예약자 정보 (매니저)
    // 유저 코드 합치면 유저 정보 같이 보여주기!
    public List<PreReservationResponseDTO> getPreReservationsByDate(Date reservationDate) {
        List<PreReservation> preReservations = preReservationRepository.findAllByReservationDate(reservationDate);

        return preReservations.stream()
                .map(this::convertToResponseDTO)
                .collect(Collectors.toList());
    }

    // DTO 변환
    private PreReservationResponseDTO convertToResponseDTO(PreReservation preReservation) {
        PreReservationResponseDTO res = new PreReservationResponseDTO();
        res.setPreReservationId(preReservation.getPreReservationId());
//        res.setUserId(preReservation.getMember().getUserId());
        res.setPopupId(preReservation.getPopup().getPopupId());
        res.setReservationDate(preReservation.getReservationDate());
        res.setReservationTime(preReservation.getReservationTime());
        res.setReservationCount(preReservation.getReservationCount());
        res.setCreatedAt(preReservation.getCreatedAt());
//        res.setReservationStatementId(preReservation.getReservationStatement().getReservationStatementId());
        return res;
    }

}
