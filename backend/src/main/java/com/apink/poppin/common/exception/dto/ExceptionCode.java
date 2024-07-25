package com.apink.poppin.common.exception.dto;

import lombok.Getter;

@Getter
public enum ExceptionCode {

    REVIEW_NOT_FOUND(404, "Review not found"),
    REVIEW_ALREADY_DELETED(400, "Review already deleted"),
    REVIEW_UPDATE_FAILURE(500, "Review update failure"),

    COMMENT_NOT_FOUND(404, "Comment not found"),
    COMMENT_ALREADY_DELETED(400, "Comment already deleted"),

    USER_NOT_FOUND(404, "User not found"),
    ;



    private final int status;
    private final String message;

    ExceptionCode(int status, String message) {
        this.status = status;
        this.message = message;
    }
}
