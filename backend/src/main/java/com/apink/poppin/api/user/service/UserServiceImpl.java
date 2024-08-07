package com.apink.poppin.api.user.service;

import com.apink.poppin.api.heart.entity.Heart;
import com.apink.poppin.api.heart.repository.HeartRepository;
import com.apink.poppin.api.popup.dto.PopupDTO;
import com.apink.poppin.api.popup.repository.PopupRepository;
import com.apink.poppin.api.reservation.dto.OnsiteReservationRedisDto;
import com.apink.poppin.api.reservation.dto.PreReservationResponseDTO;
import com.apink.poppin.api.reservation.dto.ReservationResponseDto;
import com.apink.poppin.api.reservation.entity.PreReservation;
import com.apink.poppin.api.reservation.repository.OnsiteReservationRepository;
import com.apink.poppin.api.reservation.repository.PreReservationRepository;
import com.apink.poppin.api.review.dto.ReviewListDto;
import com.apink.poppin.api.review.entity.Review;
import com.apink.poppin.api.review.repository.ReviewRepository;
import com.apink.poppin.api.user.dto.UserDto;
import com.apink.poppin.api.user.entity.User;
import com.apink.poppin.api.user.entity.UserConsent;
import com.apink.poppin.api.user.repository.UserRepository;
import com.apink.poppin.common.exception.dto.BusinessLogicException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.stream.Collectors;

import static com.apink.poppin.common.exception.dto.ExceptionCode.*;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private static final String RESERVATION_KEY_PHONE = "ONSITE_BY_PHONE_";
    private final UserRepository userRepository;
    private final PopupRepository popupRepository;
    private final HeartRepository heartRepository;
    private final ReviewRepository reviewRepository;
    private final PreReservationRepository preReservationRepository;
    private final OnsiteReservationRepository onsiteReservationRepository;
    private final RedisTemplate<String, Object> redisTemplate;
    private final ValueOperations<String, Object> valueOperations;

    @Override
    @Transactional(readOnly = true)
    public void verifyNicknameAvailable(String nickname) {
        isNicknameAvailable(nickname);
    }

    @Override
    @Transactional(readOnly = true)
    public UserDto.Response findUser(long userTsid) {
        User user = findByUserByUserTsid(userTsid);

        return UserDto.Response.builder()
                .userTsid(user.getUserTsid())
                .nickname(user.getNickname())
                .email(user.getEmail())
                .phoneNumber(user.getPhoneNumber())
                .userCategories(user.getUserCategories())
                .userConsent(user.getUserConsents())
                .build();

    }

    @Override
    @Transactional
    public UserDto.Response updateUser(UserDto.Put userDto) {
        long userTsid = userDto.getUserTsid();

        User findUser = userRepository.findUserByUserTsid(userTsid)
                .orElseThrow(() -> new RuntimeException("user not exists"));
        UserConsent findUserConsent = findUser.getUserConsents();

        findUserConsent.updateUserConsent(userDto.getUserConsents());
        findUser.updateUser(userDto, findUserConsent);

        return convertToResponseDTO(findUser);
    }

    @Override
    @Transactional
    public void deleteUser(long userTsid) {
        User findUser = userRepository.findUserByUserTsid(userTsid)
                .orElseThrow(() -> new RuntimeException("user not exists"));

        User user = User.builder()
                .userTsid(findUser.getUserTsid())
                .providerId("-" + findUser.getUserTsid())
                .providerName("-" + findUser.getUserTsid())
                .name("-" + findUser.getUserTsid())
                .nickname("-" + findUser.getUserTsid())
                .email("-" + findUser.getUserTsid())
                .age("-" + findUser.getUserTsid())
                .gender(findUser.getGender())
                .phoneNumber("-" + findUser.getUserTsid())
                .role(findUser.getRole())
                .img("default.img")
                .state(false)
                .build();

        userRepository.save(user);
    }

    @Override
    @Transactional(readOnly = true)
    public List<PopupDTO> findHeartPopup() {
        long userTsid = Long.parseLong(SecurityContextHolder.getContext().getAuthentication().getName());

        User user = userRepository.findUserByUserTsid(userTsid)
                        .orElseThrow(() -> new RuntimeException("user not exists"));

        List<Heart> hearts = heartRepository.findByUser(user);

        return Optional.ofNullable(hearts)
                .orElse(Collections.emptyList())
                .stream()
                .map(Heart::getPopup)
                .filter(popup -> !popup.isDeleted())
                .map(popup -> PopupDTO.builder()
                        .popupId(popup.getPopupId())
                        .name(popup.getName())
                        .startDate(popup.getStartDate())
                        .endDate(popup.getEndDate())
                        .hours(popup.getHours())
                        .snsUrl(popup.getSnsUrl())
                        .pageUrl(popup.getPageUrl())
                        .content(popup.getContent())
                        .description(popup.getDescription())
                        .address(popup.getAddress())
                        .lat(popup.getLat())
                        .lon(popup.getLon())
                        .heart(popup.getHeart())
                        .hit(popup.getHit())
                        .rating(popup.getRating())
                        .build())
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<ReviewListDto> findReviews() {
        long userTsid = Long.parseLong(SecurityContextHolder.getContext().getAuthentication().getName());

        User user = userRepository.findUserByUserTsid(userTsid)
                .orElseThrow(() -> new BusinessLogicException(USER_NOT_FOUND));

        List<Review> reviews = reviewRepository.findByUser(user);

        return Optional.ofNullable(reviews)
                .orElse(Collections.emptyList())
                .stream()
                .map(review -> ReviewListDto.builder()
                        .reviewId(review.getReviewId())
                        .userTsid(userTsid)
                        .nickname(user.getNickname())
                        .img(user.getImg())
                        .rating(review.getRating())
                        .title(review.getTitle())
                        .content(review.getContent())
                        .createdAt(review.getCreatedAt())
                        .build())
                .collect(Collectors.toList()
                );


    }

    @Override
    @Transactional(readOnly = true)
    public PreReservationResponseDTO findPreReservation(long prereservationId) {
        PreReservation pre = preReservationRepository.findById(prereservationId)
                .orElseThrow(() -> new RuntimeException("pre-reservation is null"));

        return this.convertToResponseDTO(pre);
    }

    @Override
    @Transactional(readOnly = true)
    public List<ReservationResponseDto> findReservations() {
        long userTsid = Long.parseLong(SecurityContextHolder.getContext().getAuthentication().getName());

        User user = userRepository.findUserByUserTsid(userTsid)
                .orElseThrow(() -> new BusinessLogicException(USER_NOT_FOUND));

        List<ReservationResponseDto> reservations = new ArrayList<>();;

        // 현장 예약 dto
        String keyByPhonePattern = RESERVATION_KEY_PHONE + user.getPhoneNumber();
        Set<String> keys = redisTemplate.keys(keyByPhonePattern + "*");
        assert keys != null;
        for (String key : keys) {
            Object obj = valueOperations.get(key);
            assert obj != null;
            if (obj instanceof OnsiteReservationRedisDto redisDto) {
                long popupId = redisDto.getPopupId();
                ReservationResponseDto reservationResponseDto
                        = popupRepository.findPopupNameAndFirstImageByPopupId(popupId);

                ReservationResponseDto reservation = ReservationResponseDto.builder()
                        .reservationId(redisDto.getOnsiteReservationRedisId())
                        .title(reservationResponseDto.getTitle())
                        .img(reservationResponseDto.getImg())
                        .reservationDate(redisDto.getVisitedDate())
                        .reservationCount(redisDto.getReservationCount())
                        .reservationStatement(redisDto.getReservationStatementId())
                        .kind(2)
                        .build();

                reservations.add(reservation);
            }
        }

        // 사전 예약 dto
        List<ReservationResponseDto> pres = preReservationRepository.findReservationsByUserTsid(user.getUserTsid());

        // 현장 예약 dto
        List<ReservationResponseDto> onsites = onsiteReservationRepository.findReservationsByPhoneNumber(user.getPhoneNumber());

        reservations.addAll(pres);
        reservations.addAll(onsites);

        return reservations;
    }

    @Override
    @Transactional(readOnly = true)
    public List<PreReservationResponseDTO> findCancelledPreReservations() {
        long userTsid = Long.parseLong(SecurityContextHolder.getContext().getAuthentication().getName());

        User user = userRepository.findUserByUserTsid(userTsid)
                .orElseThrow(() -> new RuntimeException("user not exists"));

        List<PreReservation> pres = preReservationRepository.findByUserAndReservationStatement_ReservationStatementId(user, 4);

        return Optional.ofNullable(pres)
                .orElse(Collections.emptyList())
                .stream()
                .map(this::convertToResponseDTO)
                .collect(Collectors.toList());
    }

    private void isNicknameAvailable(String nickname) {
        if(userRepository.existsByNickname(nickname)) {
            throw new BusinessLogicException(NICKNAME_EXIST);
        }
    }

    private User findByUserByUserTsid(long userTsid) {
        Optional<User> user = userRepository.findUserByUserTsid(userTsid);

        User findUser = user
                .orElseThrow(() -> new RuntimeException("User not found"));

        return findUser;
    }

    private UserDto.Response convertToResponseDTO(User user) {
        return UserDto.Response.builder()
                .userTsid(user.getUserTsid())
                .nickname(user.getNickname())
                .email(user.getEmail())
                .phoneNumber(user.getPhoneNumber())
                .userConsent(user.getUserConsents())
                .build();
    }

    // DTO 변환
    private PreReservationResponseDTO convertToResponseDTO(PreReservation preReservation) {
        return PreReservationResponseDTO.builder()
                .preReservationId(preReservation.getPreReservationId())
                .userTsid(preReservation.getUser().getUserTsid())
                .popupId(preReservation.getPopup().getPopupId())
                .reservationDate(preReservation.getReservationDate())
                .reservationTime(preReservation.getReservationTime())
                .reservationCount(preReservation.getReservationCount())
                .createdAt(preReservation.getCreatedAt())
                .reservationStatementId(preReservation.getReservationStatement().getReservationStatementId())
                .build();
    }

    private ReservationResponseDto convertToReservationDTO(PreReservation preReservation) {

        return ReservationResponseDto.builder()
                .reservationId(preReservation.getPreReservationId())
                .title(preReservation.getPopup().getName())
                .userName(preReservation.getUser().getName())
                .created_at(preReservation.getCreatedAt())

                .reservationDate(preReservation.getReservationDate())
                .reservationTime(preReservation.getReservationTime())
                .reservationCount(preReservation.getReservationCount())
                .reservationStatement(preReservation.getReservationStatement().getReservationStatementId())
                .kind(1)
                .build();
    }
}
