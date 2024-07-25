package com.apink.poppin.api.review.service;

import com.apink.poppin.api.test.entity.User;
import com.apink.poppin.api.test.entity.Popup;
import com.apink.poppin.api.review.dto.ReviewDto;
import com.apink.poppin.api.review.dto.ReviewUpdateRequestDto;
import com.apink.poppin.api.review.entity.Comment;
import com.apink.poppin.api.review.entity.Review;
import com.apink.poppin.api.review.repository.ReviewRepository;
import com.apink.poppin.common.exception.dto.BusinessLogicException;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static com.apink.poppin.common.exception.dto.ExceptionCode.*;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class ReviewServiceImplTest {

    @Mock
    private ReviewRepository reviewRepository;

    @InjectMocks
    private ReviewServiceImpl reviewService;

    @Test
    void getReviewByIdFound() {
        long reviewId = 1L;
        Popup popup = mock(Popup.class);
        User user = mock(User.class);
        List<Comment> comments = new ArrayList<>();
        Review review = Review.builder()
                .reviewId(reviewId)
                .title("Test")
                .popup(popup)
                .content("Test Content")
                .rating(4.0F)
                .user(user)
                .createdAt(Instant.now())
                .comments(comments)
                .build();
        when(reviewRepository.findById(reviewId)).thenReturn(Optional.ofNullable(review));

        ReviewDto reviewDto  = reviewService.getReviewById(reviewId);

        assertNotNull(reviewDto);
        assertEquals(reviewDto.getReviewId(), reviewId);
        assertEquals(reviewDto.getTitle(), "Test");
        verify(reviewRepository, times(1)).findById(reviewId);
    }

    @Test
    void getReviewByIdNotFound() {
        long reviewId = 1L;
        when(reviewRepository.findById(reviewId)).thenReturn(Optional.empty());

        BusinessLogicException exception = assertThrows(BusinessLogicException.class,
                () -> reviewService.getReviewById(reviewId));
        assertEquals(REVIEW_NOT_FOUND.getMessage(), exception.getMessage());
        verify(reviewRepository, times(1)).findById(reviewId);
    }

    @Test
    void updateReviewSuccess() {
        long reviewId = 1L;
        Popup popup = mock(Popup.class);
        User user = mock(User.class);
        List<Comment> comments = new ArrayList<>();

        Review existingReview = Review.builder()
                .reviewId(reviewId)
                .popup(popup)
                .user(user)
                .rating(5.0F)
                .title("existing title")
                .thumbnail("existing thumbnail")
                .content("existing content")
                .createdAt(Instant.now())
                .comments(comments)
                .deleted(false)
                .build();

        ReviewUpdateRequestDto requestDto = ReviewUpdateRequestDto.builder()
                .rating(4.0F)
                .title("updated title")
                .thumbnail("updated thumbnail")
                .content("updated content")
                .build();

        when(reviewRepository.findById(reviewId)).thenReturn(Optional.of(existingReview));

        reviewService.updateReview(reviewId, requestDto);

        assertEquals(existingReview.getRating(), requestDto.getRating());
        assertEquals(existingReview.getTitle(), requestDto.getTitle());
        assertEquals(existingReview.getThumbnail(), requestDto.getThumbnail());
        assertEquals(existingReview.getContent(), requestDto.getContent());
        verify(reviewRepository, times(1)).findById(reviewId);
        verify(reviewRepository, times(1)).save(existingReview);
    }

    @Test
    void updateReviewFailure() {

        Popup popup = mock(Popup.class);
        User user = mock(User.class);
        List<Comment> comments = new ArrayList<>();

        Review existingReview = Review.builder()
                .reviewId(1L)
                .popup(popup)
                .user(user)
                .rating(5.0F)
                .title("existing title")
                .thumbnail("existing thumbnail")
                .content("existing content")
                .createdAt(Instant.now())
                .comments(comments)
                .deleted(true)
                .build();

        ReviewUpdateRequestDto requestDto = ReviewUpdateRequestDto.builder()
                .rating(4.0F)
                .title("updated title")
                .thumbnail("updated thumbnail")
                .content("updated content")
                .build();

        when(reviewRepository.findById(anyLong())).thenReturn(Optional.of(existingReview));

        BusinessLogicException exception = assertThrows(BusinessLogicException.class,
                () -> reviewService.updateReview(anyLong(), requestDto));

        assertEquals(REVIEW_ALREADY_DELETED.getMessage(), exception.getMessage());
    }

    @Test
    void deleteReviewSuccess() {
        Review review = Review.builder()
                        .deleted(false).build();
        when(reviewRepository.findById(anyLong())).thenReturn(Optional.of(review));

        reviewService.deleteReview(anyLong());

        assertTrue(review.isDeleted());
        verify(reviewRepository, times(1)).findById(anyLong());
        verify(reviewRepository, times(1)).save(review);
    }

    @Test
    void deleteReviewFailure() {
        // given
        Review review = Review.builder().deleted(true).build();
        when(reviewRepository.findById(anyLong())).thenReturn(Optional.of(review));

        // when
        BusinessLogicException exception = assertThrows(BusinessLogicException.class,
                () -> reviewService.deleteReview(anyLong()));

        // then
        assertEquals(REVIEW_ALREADY_DELETED.getMessage(), exception.getMessage());
        verify(reviewRepository, times(1)).findById(anyLong());
    }
}
