package com.apink.poppin.common.exception.dto;

import lombok.Getter;

@Getter
public enum ExceptionCode {

    REVIEW_NOT_FOUND(404, "Review not found"),
    COMMENT_NOT_FOUND(404, "Comment not found"),
    REVIEW_ALREADY_DELETED(400, "Review already deleted"),;

    private final int status;
    private final String message;

    ExceptionCode(int status, String message) {
        this.status = status;
        this.message = message;
    }
}
