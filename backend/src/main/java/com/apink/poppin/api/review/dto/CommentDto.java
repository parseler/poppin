package com.apink.poppin.api.review.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.time.Instant;

@Getter
@Builder
@AllArgsConstructor
public class CommentDto {
    private long commentId;
    private long userTsid;
    private String nickname;
    private String img;
    private long reviewId;
    private String content;
    private Instant createdAt;
    private Long parent;
}
