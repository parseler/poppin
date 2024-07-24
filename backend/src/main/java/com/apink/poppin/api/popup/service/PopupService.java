package com.apink.poppin.api.popup.service;

import com.apink.poppin.api.popup.entity.Popup;

import java.util.List;

public interface PopupService {

    // 전체 팝업 목록 조회
    List<Popup> getPopupList();

}
