package com.apink.poppin.api.controller;

import com.apink.poppin.api.review.controller.ReviewController;
import com.apink.poppin.api.review.dto.ReviewDto;
import com.apink.poppin.api.review.service.ReviewService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;

import java.time.Instant;
import java.util.ArrayList;
import java.util.NoSuchElementException;

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
    @WithMockUser
    void getReviewFound() throws Exception {

        long reviewId = 1L;
        ReviewDto reviewDto = ReviewDto.builder()
                .reviewId(reviewId)
                .title("Test")
                .popupId(1L)
                .content("Test Content")
                .rating(4.0F)
                .userTsid(1234567890L)
                .createdAt(Instant.now())
                .commentDtoList(new ArrayList<>())
                .build();

        when(reviewService.getReviewById(reviewId)).thenReturn(reviewDto);

        mockMvc.perform(get("/api/reviews/{reviewId}", reviewId))
                .andExpect(status().isOk());
    }

    @Test
    @WithMockUser
    void getReviewNotFound() throws Exception {

        long reviewId = 1L;

        when(reviewService.getReviewById(reviewId)).thenThrow(new NoSuchElementException());

        mockMvc.perform(get("/api/reviews/{reviewId}", reviewId))
                .andExpect(status().isNotFound());
    }
}
