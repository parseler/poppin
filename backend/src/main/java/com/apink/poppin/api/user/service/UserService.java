package com.apink.poppin.api.user.service;

import com.apink.poppin.api.popup.dto.PopupDTO;
import com.apink.poppin.api.reservation.dto.PreReservationResponseDTO;
import com.apink.poppin.api.reservation.dto.ReservationResponseDto;
import com.apink.poppin.api.review.dto.ReviewListDto;
import com.apink.poppin.api.user.dto.UserDto;

import java.util.List;

public interface UserService {

    void verifyNicknameAvailable(String nickname);

    UserDto.Response findUser(long userTsid);

    UserDto.Response updateUser(UserDto.Put userDto);

    void deleteUser(long userTsid);

    List<PopupDTO> findHeartPopup();

    List<ReviewListDto> findReviews();

    PreReservationResponseDTO findPreReservation(long prereservationId);

    List<PreReservationResponseDTO> findCancelledPreReservations();

    List<ReservationResponseDto> findReservations();
}