package com.apink.poppin.api.review.service;

import com.apink.poppin.api.popup.entity.Popup;
import com.apink.poppin.api.popup.repository.PopupRepository;
import com.apink.poppin.api.review.dto.CommentDto;
import com.apink.poppin.api.review.dto.ReviewDto;
import com.apink.poppin.api.review.dto.ReviewListDto;
import com.apink.poppin.api.review.dto.ReviewUpdateRequestDto;
import com.apink.poppin.api.review.entity.Comment;
import com.apink.poppin.api.review.entity.Review;
import com.apink.poppin.api.review.repository.ReviewRepository;
import com.apink.poppin.api.user.entity.User;
import com.apink.poppin.api.user.repository.UserRepository;
import com.apink.poppin.common.exception.dto.BusinessLogicException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

import static com.apink.poppin.common.exception.dto.ExceptionCode.*;

@Service
@RequiredArgsConstructor
public class ReviewServiceImpl implements ReviewService {

    private final ReviewRepository reviewRepository;
    private final UserRepository userRepository; // 나중에 삭제
    private final PopupRepository popupRepository;

    @Override
    public ReviewDto getReviewById(long reviewId) {

        Review review = reviewRepository.findById(reviewId)
                .orElseThrow(() -> new BusinessLogicException(REVIEW_NOT_FOUND));

        User user = review.getUser();

        List<CommentDto> comments = new ArrayList<>();

        for (Comment comment : review.getComments()) {
            User commentWriter = comment.getUser();
            CommentDto.CommentDtoBuilder commentDto = CommentDto.builder()
                    .commentId(comment.getCommentId())
                    .reviewId(reviewId)
                    .userTsid(commentWriter.getUserTsid())
                    .nickname(commentWriter.getNickname())
                    .img(commentWriter.getImg())
                    .createdAt(comment.getCreatedAt())
                    .content(comment.getContent());

            if (comment.getParent() != null) {
                commentDto.parent(comment.getParent().getCommentId());
            }
            comments.add(commentDto.build());
        }

        return ReviewDto.builder()
                .reviewId(review.getReviewId())
                .title(review.getTitle())
                .popupId(review.getPopup().getPopupId())
                .content(review.getContent())
                .rating(review.getRating())
                .userTsid(user.getUserTsid())
                .nickname(user.getNickname())
                .img(user.getImg())
                .createdAt(review.getCreatedAt())
                .commentDtoList(comments)
                .build();
    }

    @Override
    public void updateReview(long reviewId, ReviewUpdateRequestDto requestDto) {

        Review review = reviewRepository.findById(reviewId)
                .orElseThrow(() -> new BusinessLogicException(REVIEW_NOT_FOUND));

        if (review.isDeleted()) {
            throw new BusinessLogicException(REVIEW_ALREADY_DELETED);
        }

        review.updateReview(requestDto);

        reviewRepository.save(review);
    }

    @Override
    public void deleteReview(long reviewId) {
        Review review = reviewRepository.findById(reviewId)
                .orElseThrow(() -> new BusinessLogicException(REVIEW_NOT_FOUND));

        if (review.isDeleted()) {
            throw new BusinessLogicException(REVIEW_ALREADY_DELETED);
        }

        review.deleteReview();
        reviewRepository.save(review);
    }

    @Override
    public void createReview(long popupId, ReviewDto reviewDto) {
        
        User user = userRepository.findUserByUserTsid(reviewDto.getUserTsid())
                .orElseThrow(() -> new BusinessLogicException(USER_NOT_FOUND));

        Popup popup = popupRepository.findById(popupId)
                .orElseThrow(() -> new BusinessLogicException((POPUP_NOT_FOUND)));

        Review review = Review.builder()
                .popup(popup)
                .user(user)
                .createdAt(Instant.now())
                .deleted(false)
                .rating(reviewDto.getRating())
                .title(reviewDto.getTitle())
                .thumbnail(reviewDto.getThumbnail())
                .content(reviewDto.getContent())
                .build();

        reviewRepository.save(review);
    }

    @Override
    public List<ReviewListDto> getReviewsByPopupId(long popupId) {

        List<Review> reviews = reviewRepository.findReviewsByPopup_PopupIdAndDeletedFalse(popupId);

        List<ReviewListDto> list = new ArrayList<>();
        for (Review review : reviews) {
            ReviewListDto reviewListDto = ReviewListDto.builder()
                    .reviewId(review.getReviewId())
                    .userTsid(review.getUser().getUserTsid())
                    .nickname(review.getUser().getNickname())
                    .img(review.getUser().getImg())
                    .content(review.getContent())
                    .createdAt(review.getCreatedAt())
                    .title(review.getTitle())
                    .rating(review.getRating())
                    .build();

            list.add(reviewListDto);
        }

        return list;
    }

    @Override
    public List<ReviewListDto> getReviews() {

        List<Review> reviews = reviewRepository.findByDeletedFalse();
        List<ReviewListDto> list = new ArrayList<>();

        for (Review review : reviews) {
            ReviewListDto dto = ReviewListDto.builder()
                    .reviewId(review.getReviewId())
                    .title(review.getTitle())
                    .userTsid(review.getUser().getUserTsid())
                    .nickname(review.getUser().getNickname())
                    .img(review.getUser().getImg())
                    .content(review.getContent())
                    .createdAt(review.getCreatedAt())
                    .rating(review.getRating())
                    .build();
            list.add(dto);
        }
        return list;
    }
}
