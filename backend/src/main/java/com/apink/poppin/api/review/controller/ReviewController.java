package com.apink.poppin.api.review.controller;

import com.apink.poppin.api.review.dto.ReviewDto;
import com.apink.poppin.api.review.service.ReviewService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/reviews")
@RequiredArgsConstructor
public class ReviewController {

    private final ReviewService reviewService;

    @GetMapping("/{reviewId}")
    public ResponseEntity<?> getReview(@PathVariable long reviewId) {
        ReviewDto reviewDto = reviewService.getReviewById(reviewId);

        return ResponseEntity.ok(reviewDto);
    }
}
