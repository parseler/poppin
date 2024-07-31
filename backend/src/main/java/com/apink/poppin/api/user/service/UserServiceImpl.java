package com.apink.poppin.api.user.service;

import com.apink.poppin.api.heart.entity.Heart;
import com.apink.poppin.api.heart.repository.HeartRepository;
import com.apink.poppin.api.popup.dto.PopupDTO;
import com.apink.poppin.api.popup.entity.Popup;
import com.apink.poppin.api.popup.repository.PopupRepository;
import com.apink.poppin.api.reservation.dto.PreReservationResponseDTO;
import com.apink.poppin.api.reservation.entity.PreReservation;
import com.apink.poppin.api.reservation.repository.OnsiteReservationRepository;
import com.apink.poppin.api.reservation.repository.PreReservationRepository;
import com.apink.poppin.api.review.dto.CommentDto;
import com.apink.poppin.api.review.dto.ReviewDto;
import com.apink.poppin.api.review.entity.Comment;
import com.apink.poppin.api.review.entity.Review;
import com.apink.poppin.api.review.repository.ReviewRepository;
import com.apink.poppin.api.user.dto.UserDto;
import com.apink.poppin.api.user.entity.User;
import com.apink.poppin.api.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final PopupRepository popupRepository;
    private final HeartRepository heartRepository;
    private final ReviewRepository reviewRepository;
    private final PreReservationRepository preReservationRepository;
    private final OnsiteReservationRepository onsiteReservationRepository;

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
//                .userCategories();
                .build();

    }

    @Override
    @Transactional
    public UserDto.Response updateUser(UserDto.Put userDto) {
        long userTsid = userDto.getUserTsid();

        User findUser = userRepository.findUserByUserTsid(userTsid)
                .orElseThrow(() -> new RuntimeException("user not exists"));

        User user = User.builder()
                .userTsid(findUser.getUserTsid())
                .providerId(findUser.getProviderId())
                .providerName(findUser.getProviderName())
                .name(findUser.getName())
                .nickname(userDto.getNickname())
                .email(findUser.getEmail())
                .age(findUser.getAge())
                .gender(findUser.getGender())
                .phoneNumber(findUser.getPhoneNumber())
                .role(findUser.getRole())
                .img(userDto.getImg())
                .build();

        userRepository.save(user);

        return convertToResponseDTO(user);
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
                .map(popup -> new PopupDTO(popup.getPopupId(), popup.getName(), popup.getStartDate(), popup.getEndDate(), popup.getHeart()))
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<ReviewDto> findReviews() {
        long userTsid = Long.parseLong(SecurityContextHolder.getContext().getAuthentication().getName());

        User user = userRepository.findUserByUserTsid(userTsid)
                .orElseThrow(() -> new RuntimeException("user not exists"));

        List<Review> reviews = reviewRepository.findByUser(user);

        return Optional.ofNullable(reviews)
                .orElse(Collections.emptyList())
                .stream()
                .map(review -> new ReviewDto(review.getReviewId(), review.getPopup().getPopupId(), review.getUser().getUserTsid(), review.getRating(), review.getTitle(), review.getContent(), review.getThumbnail(), review.getCreatedAt(),
                        review.getComments()
                                .stream()
                                .map(comment -> new CommentDto(comment.getCommentId(), comment.getUser().getUserTsid(), comment.getReview().getReviewId(), comment.getContent(), comment.getCreatedAt(),
                                        Optional.ofNullable(comment.getParent())
                                                .orElse(Comment.builder()
                                                        .commentId(0L).build())
                                                .getCommentId()))
                                .collect(Collectors.toList())))
                .collect(Collectors.toList());
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
    public List<PreReservationResponseDTO> findPreReservations() {
        long userTsid = Long.parseLong(SecurityContextHolder.getContext().getAuthentication().getName());

        User user = userRepository.findUserByUserTsid(userTsid)
                .orElseThrow(() -> new RuntimeException("user not exists"));

        List<PreReservation> pres = preReservationRepository.findByUser(user);

        return Optional.ofNullable(pres)
                .orElse(Collections.emptyList())
                .stream()
                .map(this::convertToResponseDTO)
                .collect(Collectors.toList());
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
            throw new RuntimeException("user not exists");
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


}
