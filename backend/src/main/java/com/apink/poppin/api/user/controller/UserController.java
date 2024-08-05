package com.apink.poppin.api.user.controller;

import com.apink.poppin.api.popup.dto.PopupDTO;
import com.apink.poppin.api.reservation.dto.PreReservationResponseDTO;
import com.apink.poppin.api.reservation.dto.ReservationResponseDto;
import com.apink.poppin.api.review.dto.ReviewListDto;
import com.apink.poppin.api.user.dto.UserDto;
import com.apink.poppin.api.user.service.UserService;
import com.apink.poppin.common.exception.dto.BusinessLogicException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static com.apink.poppin.common.exception.dto.ExceptionCode.*;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    // 닉네임 중복 확인
    @GetMapping("/{nickname}/check")
    public ResponseEntity<?> checkNickname(@PathVariable String nickname) {
        userService.verifyNicknameAvailable(nickname);

        return ResponseEntity.ok().build();
    }

    // 유저 본인 정보 조회
    @GetMapping("/me")
    public ResponseEntity<?> findUser() {
        UserDto.Response user;
        try {
            long userTsid = Long.parseLong(SecurityContextHolder.getContext().getAuthentication().getName());
            user = userService.findUser(userTsid);
        } catch (Exception e) {
            throw new BusinessLogicException(USER_NOT_FOUND);
        }

        return ResponseEntity.ok(user);
    }

    // 유저 정보 수정
    @PutMapping("/me")
    public ResponseEntity<?> updateUser(@RequestBody UserDto.Put userDto) {
        UserDto.Response user = userService.updateUser(userDto);

        return ResponseEntity.ok(user);
    }

    // 유저 탈퇴
    @DeleteMapping("me")
    public ResponseEntity<?> deleteUser() {
        long userTsid = Long.parseLong(SecurityContextHolder.getContext().getAuthentication().getName());
        userService.deleteUser(userTsid);

        return ResponseEntity.ok().build();
    }

//    @GetMapping("/me/recent-search")
//    public ResponseEntity<?> recentSearch() {
//
//    }
//
//    @GetMapping("/me/recommended-popups")
//    public ResponseEntity<?> findRecommendedPopup() {
//
//    }

    // 내가 좋아요한 팝업 조회
    @GetMapping("/me/popups/heart")
    public ResponseEntity<?> findHeartPopup() {
        List<PopupDTO> popups = userService.findHeartPopup();

        return ResponseEntity.ok(popups);
    }

    // 내가 작성한 리뷰 조회
    @GetMapping("/me/popups/reviews")
    public ResponseEntity<?> findReview() {
        List<ReviewListDto> reviews = userService.findReviews();

        return ResponseEntity.ok(reviews);
    }

    // 내 예약 조회 (현장, 사전, 완료)
    @GetMapping("/me/popups/reservations")
    public ResponseEntity<?> findReservations() {
        List<ReservationResponseDto> reservations = userService.findReservations();

        return ResponseEntity.ok(reservations);
    }

    // 내 사전 예약 상세 조회
    @GetMapping("/me/popups/pre-reservations/{prereservation_id}")
    public ResponseEntity<?> findPreReservation(@PathVariable String prereservation_id) {
        PreReservationResponseDTO preReservation = userService.findPreReservation(Long.parseLong(prereservation_id));

        return ResponseEntity.ok(preReservation);
    }

    // 취소된 예약 조회
    @GetMapping("/me/popups/cancelled-reservation")
    public ResponseEntity<?> findCancelledReservation() {
        List<PreReservationResponseDTO> preReservations = userService.findCancelledPreReservations();

        return ResponseEntity.ok(preReservations);

    }

//    // 알림 조회
//    @GetMapping("/me/notifications")
//    public ResponseEntity<?> findNotification() {
//
//
//        return ResponseEntity.ok().build();
//    }
//
//    // 알림 전체 삭제
//    @DeleteMapping("/me/notifications")
//    public ResponseEntity<?> deleteNotification() {
//
//        return ResponseEntity.ok().build();
//    }

}
