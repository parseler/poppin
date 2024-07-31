package com.apink.poppin.api.user.service;

import com.apink.poppin.api.popup.dto.PopupDTO;
import com.apink.poppin.api.popup.entity.Popup;
import com.apink.poppin.api.reservation.dto.PreReservationResponseDTO;
import com.apink.poppin.api.reservation.entity.PreReservation;
import com.apink.poppin.api.review.dto.ReviewDto;
import com.apink.poppin.api.review.entity.Review;
import com.apink.poppin.api.user.dto.UserDto;
import com.apink.poppin.api.user.entity.User;

import java.util.List;

public interface UserService {

    void verifyNicknameAvailable(String nickname);

    UserDto.Response findUser(long userTsid);

    UserDto.Response updateUser(UserDto.Put userDto);

    void deleteUser(long userTsid);

    List<PopupDTO> findHeartPopup();

    List<ReviewDto> findReviews();

    PreReservationResponseDTO findPreReservation(long prereservationId);

    List<PreReservationResponseDTO> findPreReservations();

    List<PreReservationResponseDTO> findCancelledPreReservations();
}
