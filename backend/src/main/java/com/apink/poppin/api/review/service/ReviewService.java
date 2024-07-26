package com.apink.poppin.api.review.service;

import com.apink.poppin.api.review.dto.ReviewDto;
import com.apink.poppin.api.review.dto.ReviewUpdateRequestDto;

public interface ReviewService {
    ReviewDto getReviewById(long reviewId);

    void updateReview(long reviewId, ReviewUpdateRequestDto requestDto);

    void deleteReview(long reviewId);
}
