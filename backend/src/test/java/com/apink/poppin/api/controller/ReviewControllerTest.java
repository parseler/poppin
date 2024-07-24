package com.apink.poppin.api.controller;

import com.apink.poppin.api.review.controller.ReviewController;
import com.apink.poppin.api.review.dto.ReviewDto;
import com.apink.poppin.api.review.service.ReviewService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(controllers = ReviewController.class)
public class ReviewControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private ReviewService reviewService;

    @Test
    void getReviewFound() throws Exception {
        Long reviewId = 1L;
        ReviewDto reviewDto = new ReviewDto();

        when(reviewService.getReview(reviewId)).thenReturn(reviewDto);

        mockMvc.perform(get("/api/reviews/{reviewId}", reviewId))
                .andExpect(status().isOk());
    }

    @Test
    void getReviewNotFound() throws Exception {
        Long reviewId = 1L;
        ReviewDto reviewDto = new ReviewDto();

        when(reviewService.getReview(reviewId)).thenReturn(null);

        mockMvc.perform(get("/api/reviews/{reviewId}", reviewId))
                .andExpect(status().isNotFound());
    }
}
