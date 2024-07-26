package com.apink.poppin.api.popup.controller;


import com.apink.poppin.api.heart.dto.HeartRequestDTO;
import com.apink.poppin.api.heart.service.HeartService;
import com.apink.poppin.api.popup.dto.PopupDTO;
import com.apink.poppin.api.popup.dto.PreReservationRequestDTO;
import com.apink.poppin.api.popup.dto.PreReservationResponseDTO;
import com.apink.poppin.api.popup.entity.Popup;
import com.apink.poppin.api.popup.entity.PreReservation;
import com.apink.poppin.api.popup.service.PopupService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/popups")
public class PopupController {

    private final PopupService popupService;
    private final HeartService heartService;


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
    // 일단 좋아요 순으로 해뒀습니다!
    @GetMapping("/rank")
    public ResponseEntity<List<PopupDTO>> getPopupRank() {
        List<PopupDTO> rankList = popupService.getPopupRank();
        return new ResponseEntity<>(rankList, HttpStatus.OK);
    }

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

    // 팝업 사전 예약하기
    @PostMapping("/{popupId}/pre-reservations")
    public ResponseEntity<PreReservation> createPreReservation(@RequestBody PreReservationRequestDTO req, @PathVariable("popupId") Long popupId) {
        PreReservation preReservation = popupService.createPreReservation(req);
        return new ResponseEntity<>(preReservation, HttpStatus.CREATED);
    }

    // 날짜 별 사전 예약자 정보 조회
    @GetMapping("/{popupId}/pre-reservations")
    public ResponseEntity<List<PreReservationResponseDTO>> getPreReservation(@RequestParam("reservationDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date reservationDate,
                                                                             @PathVariable("popupId") Long popupId) {
        List<PreReservationResponseDTO> list = popupService.getPreReservationsByDate(reservationDate);
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    // 팝업 좋아요
    @PostMapping("/{popupId}/heart")
    public ResponseEntity<String> insertHeart (@RequestBody @Valid HeartRequestDTO reqDto, @PathVariable("popupId") Long popupId) throws Exception {
        heartService.insert(reqDto);
        return new ResponseEntity<>("좋아요 추가 완료", HttpStatus.OK);
    }

    // 팝업 좋아요 해제
    @DeleteMapping("/{popupId}/heart")
    public ResponseEntity<String> deleteHeart (@RequestBody @Valid HeartRequestDTO reqDto, @PathVariable("popupId") Long popupId) throws Exception {
        heartService.delete(reqDto);
        return new ResponseEntity<>("좋아요 해제 완료", HttpStatus.OK);
    }

}
