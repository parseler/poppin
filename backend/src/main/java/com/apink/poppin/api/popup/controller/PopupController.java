package com.apink.poppin.api.popup.controller;


import com.apink.poppin.api.popup.dto.PopupDTO;
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
    public ResponseEntity<List<PopupDTO>> getPopupList(@RequestParam(value="keyword", defaultValue="") String keyword) {
        List<PopupDTO> allList = popupService.getPopupList(keyword);
        return new ResponseEntity<>(allList, HttpStatus.OK);
    }

    // 팝업 상세 조회
    @GetMapping("/{popupId}")
    public ResponseEntity<PopupDTO> getPopup(@PathVariable("popupId") long popupId) {
        PopupDTO popup = popupService.getPopup(popupId);
        return new ResponseEntity<>(popup, HttpStatus.OK);
    }

    // 인기 팝업 조회
//    @GetMapping("/rank")
//    public ResponseEntity<List<PopupDTO>> getPopupRank() {
//        List<PopupDTO> rankList = popupService.getPopupRank();
//        return new ResponseEntity<>(rankList, HttpStatus.OK);
//    }

    // 유사 팝업 조회
//    @GetMapping("/{popupId}/tag")
//    public ResponseEntity<List<Popup>> getSimilarPopup(@PathVariable("popupId") long popupId) {
//        List<Popup> similarList = popupService.getSimilarPopup(popupId);
//        return new ResponseEntity<>(similarList, HttpStatus.OK);
//    }

    // 오픈 예정 팝업 조회
    @GetMapping("/open")
    public ResponseEntity<List<PopupDTO>> getOpenPopup() {
        List<PopupDTO> openList = popupService.getOpenPopup();
        return new ResponseEntity<>(openList, HttpStatus.OK);
    }

}
