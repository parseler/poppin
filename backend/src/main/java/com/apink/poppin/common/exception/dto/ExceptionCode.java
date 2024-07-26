package com.apink.poppin.common.exception.dto;

import lombok.Getter;

@Getter
public enum ExceptionCode {

    REVIEW_NOT_FOUND(404, "Review not found"),
    REVIEW_ALREADY_DELETED(400, "Review already deleted"),
    REVIEW_CREATE_FAILED(401, "Review creation failed"),
    REVIEW_UPDATE_FAILED(500, "Review update failed"),

    COMMENT_NOT_FOUND(404, "Comment not found"),
    COMMENT_ALREADY_DELETED(400, "Comment already deleted"),
    COMMENT_CREATE_FAILED(400, "Comment creation failed"),
    COMMENT_UPDATE_FAILED(401, "Comment update failed"),

    USER_NOT_FOUND(404, "User not found"),
    ;



    private final int status;
    private final String message;

    ExceptionCode(int status, String message) {
        this.status = status;
        this.message = message;
    }
}
