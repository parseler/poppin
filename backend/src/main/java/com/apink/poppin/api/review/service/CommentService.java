package com.apink.poppin.api.review.service;

import com.apink.poppin.api.review.dto.CommentDto;
import com.apink.poppin.api.review.entity.Comment;

public interface CommentService {

    Comment createComment(long reviewId, CommentDto commentDto);

    void updateComment(long reviewId, long commentId, CommentDto commentDto);

    void deleteComment(long reviewId, long commentId);
}
