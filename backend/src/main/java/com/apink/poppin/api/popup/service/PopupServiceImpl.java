package com.apink.poppin.api.popup.service;

import com.apink.poppin.api.popup.entity.Popup;
import com.apink.poppin.api.popup.repository.PopupRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class PopupServiceImpl implements PopupService {

    @Autowired
    private PopupRepository popupRepository;

    // 팝업 전체 목록 조회 및 검색
    public List<Popup> getPopupList() {
        return popupRepository.findAll();
    }

    // 팝업 상세 조회
    public Popup getPopup(long popupId) {
        return popupRepository.findById(popupId);
    }

}
