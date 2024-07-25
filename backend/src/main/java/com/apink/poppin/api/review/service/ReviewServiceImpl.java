package com.apink.poppin.api.review.service;

import com.apink.poppin.api.review.dto.CommentDto;
import com.apink.poppin.api.review.dto.ReviewDto;
import com.apink.poppin.api.review.dto.ReviewUpdateRequestDto;
import com.apink.poppin.api.review.entity.Comment;
import com.apink.poppin.api.review.entity.Review;
import com.apink.poppin.api.review.repository.ReviewRepository;
import com.apink.poppin.common.exception.dto.BusinessLogicException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

import static com.apink.poppin.common.exception.dto.ExceptionCode.REVIEW_ALREADY_DELETED;
import static com.apink.poppin.common.exception.dto.ExceptionCode.REVIEW_NOT_FOUND;

@Service
@RequiredArgsConstructor
public class ReviewServiceImpl implements ReviewService {

    private final ReviewRepository reviewRepository;

    @Override
    public ReviewDto getReviewById(long reviewId) {

        Review review = reviewRepository.findById(reviewId)
                .orElseThrow(() -> new BusinessLogicException(REVIEW_NOT_FOUND));

        List<CommentDto> comments = new ArrayList<>();

        for (Comment comment : review.getComments()) {
            CommentDto.CommentDtoBuilder commentDto = CommentDto.builder()
                    .commentId(comment.getCommentId())
                    .reviewId(reviewId)
                    .userTsid(comment.getUser().getUserTsid())
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
                .userTsid(review.getUser().getUserTsid())
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
        } else {
            review.deleteReview();
            reviewRepository.save(review);
        }
    }
}
