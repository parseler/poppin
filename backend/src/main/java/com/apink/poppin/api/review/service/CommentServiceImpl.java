package com.apink.poppin.api.review.service;

import com.apink.poppin.api.review.dto.CommentDto;
import com.apink.poppin.api.review.entity.Comment;
import com.apink.poppin.api.review.entity.Review;
import com.apink.poppin.api.review.repository.CommentRepository;
import com.apink.poppin.api.review.repository.ReviewRepository;
import com.apink.poppin.api.test.entity.User;
import com.apink.poppin.api.test.repository.UserRepository;
import com.apink.poppin.common.exception.dto.BusinessLogicException;
import com.apink.poppin.common.exception.dto.ExceptionCode;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CommentServiceImpl implements CommentService {

    private final CommentRepository commentRepository;
    private final ReviewRepository reviewRepository;
    private final UserRepository userRepository;

    @Override
    public Comment createComment(CommentDto commentDto) {
        Review review = getReview(commentDto.getReviewId());
        User user = getUser(commentDto.getUserTsid());
        Comment parent = getParent(commentDto.getParent());

        Comment comment = new Comment();
        comment.createComment(commentDto, review, user, parent);

       return commentRepository.save(comment);
    }

    @Override
    public void updateComment(CommentDto commentDto) {
        Comment comment = commentRepository.findById(commentDto.getCommentId())
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.COMMENT_NOT_FOUND));

        if (comment.isDeleted()) {
            throw new BusinessLogicException(ExceptionCode.COMMENT_ALREADY_DELETED);
        }

        comment.updateComment(commentDto.getContent());

        commentRepository.save(comment);
    }

    private Review getReview(long id) {
        return reviewRepository.findById(id)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.REVIEW_NOT_FOUND));
    }

    private User getUser(long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.USER_NOT_FOUND));
    }

    private Comment getParent(long id) {
        return commentRepository.findById(id).orElse(null);
    }
}
