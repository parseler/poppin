package com.apink.poppin.api.review.service;

import com.apink.poppin.api.review.dto.ReviewDto;
import com.apink.poppin.api.review.dto.ReviewListDto;
import com.apink.poppin.api.review.dto.ReviewUpdateRequestDto;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface ReviewService {
    ReviewDto getReviewById(long reviewId);

    void updateReview(long reviewId, ReviewUpdateRequestDto requestDto);

    void deleteReview(long reviewId);

    void createReview(long popupId, ReviewDto reviewDto);

    List<ReviewListDto> getReviewsByPopupId(long popupId);

    List<ReviewListDto> getReviews();

    String uploadReviewImage(MultipartFile img);
}
