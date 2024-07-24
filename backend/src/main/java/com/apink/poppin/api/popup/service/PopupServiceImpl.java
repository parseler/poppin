package com.apink.poppin.api.popup.service;

import com.apink.poppin.api.popup.dto.PopupDTO;
import com.apink.poppin.api.popup.entity.Popup;
import com.apink.poppin.api.popup.repository.PopupRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class PopupServiceImpl implements PopupService {

    @Autowired
    private PopupRepository popupRepository;

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

}
