package com.apink.poppin.api.review.controller;

import com.apink.poppin.api.review.dto.CommentDto;
import com.apink.poppin.api.review.dto.ReviewDto;
import com.apink.poppin.api.review.dto.ReviewUpdateRequestDto;
import com.apink.poppin.api.review.service.CommentService;
import com.apink.poppin.api.review.service.ReviewService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/reviews")
@RequiredArgsConstructor
public class ReviewController {

    private final ReviewService reviewService;
    private final CommentService commentService;

    @GetMapping("/{reviewId}")
    public ResponseEntity<?> getReview(@PathVariable long reviewId) {
        ReviewDto reviewDto = reviewService.getReviewById(reviewId);

        return ResponseEntity.ok(reviewDto);
    }

    @PutMapping("/{reviewId}")
    public ResponseEntity<?> updateReview(@PathVariable long reviewId, @RequestBody ReviewUpdateRequestDto requestDto) {
        reviewService.updateReview(reviewId, requestDto);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{reviewId}")
    public ResponseEntity<?> deleteReview(@PathVariable long reviewId) {
        reviewService.deleteReview(reviewId);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/{reviewId}/comments")
    public ResponseEntity<?> createComment(@PathVariable long reviewId, @RequestBody CommentDto commentDto) {
        commentService.createComment(reviewId, commentDto);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/{reviewId}/comments/{commentId}")
    public ResponseEntity<?> updateComment(@PathVariable long reviewId, @PathVariable long commentId, @RequestBody CommentDto commentDto) {
        commentService.updateComment(reviewId, commentId, commentDto);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{reviewId}/comments/{commentId}")
    public ResponseEntity<?> deleteComment(@PathVariable long reviewId, @PathVariable long commentId) {
        commentService.deleteComment(reviewId, commentId);
        return ResponseEntity.ok().build();
    }
}
