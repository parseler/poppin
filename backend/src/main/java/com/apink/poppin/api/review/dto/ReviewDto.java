package com.apink.poppin.api.review.dto;

import lombok.Builder;
import lombok.Getter;

import java.time.Instant;
import java.util.List;

@Getter
@Builder
public class ReviewDto {
    private long reviewId;
    private long popupId;
    private long userTsid;
    private float rating;
    private String title;
    private String content;
    private String thumbnail;
    private Instant createdAt;
    private List<CommentDto> commentDtoList;
}
