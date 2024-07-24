package com.apink.poppin.api.popup.service;

import com.apink.poppin.api.popup.entity.Popup;

import java.util.List;

public interface PopupService {

    // 전체 팝업 목록 조회 및 검색
    List<Popup> getPopupList(String keyword);


    // 팝업 상세 조회
    Popup getPopup(long popupId);


}
