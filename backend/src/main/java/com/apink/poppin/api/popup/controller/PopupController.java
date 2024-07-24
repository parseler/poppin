package com.apink.poppin.api.popup.controller;


import com.apink.poppin.api.popup.entity.Popup;
import com.apink.poppin.api.popup.service.PopupService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/popups")
public class PopupController {

    @Autowired
    private PopupService popupService;


    // 팝업 전체 목록 조회 및 검색
    @GetMapping("")
    public ResponseEntity<List<Popup>> getPopupList(@RequestParam(value="keyword", defaultValue="") String keyword) {
        List<Popup> list = popupService.getPopupList(keyword);
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    // 팝업 상세 조회
    @GetMapping("/{popupId}")
    public ResponseEntity<Popup> getPopup(@PathVariable("popupId") long popupId) {
        Popup popup = popupService.getPopup(popupId);

        return new ResponseEntity<>(popup, HttpStatus.OK);
    }

}
