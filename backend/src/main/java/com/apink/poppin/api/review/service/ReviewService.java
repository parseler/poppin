package com.apink.poppin.api.review.service;

import com.apink.poppin.api.review.dto.ReviewDto;

public interface ReviewService {
    ReviewDto getReviewById(long reviewId);

    void updateReview(ReviewDto updatedReviewDto);
}
