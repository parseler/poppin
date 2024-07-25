package com.apink.poppin.api.review.service;

import com.apink.poppin.api.review.dto.CommentDto;
import com.apink.poppin.api.review.entity.Comment;

public interface CommentService {

    Comment createComment(CommentDto commentDto);

    void updateComment(CommentDto commentDto);
}
