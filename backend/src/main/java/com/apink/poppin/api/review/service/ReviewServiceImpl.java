package com.apink.poppin.api.review.service;

import com.apink.poppin.api.review.dto.CommentDto;
import com.apink.poppin.api.review.dto.ReviewDto;
import com.apink.poppin.api.review.entity.Comment;
import com.apink.poppin.api.review.entity.Review;
import com.apink.poppin.api.review.repository.ReviewRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;

@Service
@RequiredArgsConstructor
public class ReviewServiceImpl implements ReviewService {

    private final ReviewRepository reviewRepository;

    @Override
    public ReviewDto getReviewById(long reviewId) {

        Review review = reviewRepository.findById(reviewId).orElseThrow(
                () -> new NoSuchElementException("Review not found"));

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
}
