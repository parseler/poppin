package com.apink.poppin.api.review.service;

import com.apink.poppin.api.review.dto.CommentDto;
import com.apink.poppin.api.review.entity.Comment;
import com.apink.poppin.api.review.entity.Review;
import com.apink.poppin.api.review.repository.CommentRepository;
import com.apink.poppin.api.review.repository.ReviewRepository;
import com.apink.poppin.api.user.entity.User;
import com.apink.poppin.api.user.repository.UserRepository;
import com.apink.poppin.common.exception.dto.BusinessLogicException;
import com.apink.poppin.common.exception.dto.ExceptionCode;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class CommentServiceImpl implements CommentService {

    private final CommentRepository commentRepository;
    private final ReviewRepository reviewRepository;
    private final UserRepository userRepository;

    @Override
    @Transactional
    public Comment createComment(long reviewId, CommentDto commentDto) {

        if (reviewId != commentDto.getReviewId()) {
            throw new BusinessLogicException(ExceptionCode.COMMENT_CREATE_FAILED);
        }

        Review review = getReview(commentDto.getReviewId());
        User user = getUser(commentDto.getUserTsid());
        Comment parent = getParent(commentDto.getParent());

        Comment comment = new Comment();
        comment.createComment(commentDto, review, user, parent);

       return commentRepository.save(comment);
    }

    @Override
    @Transactional
    public void updateComment(long reviewId, long commentId, CommentDto commentDto) {
        Comment comment = commentRepository.findById(commentDto.getCommentId())
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.COMMENT_NOT_FOUND));

        if (reviewId != commentDto.getReviewId()) {
            throw new BusinessLogicException(ExceptionCode.COMMENT_UPDATE_FAILED);
        }

        if (commentId != commentDto.getCommentId()) {
            throw new BusinessLogicException(ExceptionCode.COMMENT_UPDATE_FAILED);
        }

        if (comment.isDeleted()) {
            throw new BusinessLogicException(ExceptionCode.COMMENT_ALREADY_DELETED);
        }

        comment.updateComment(commentDto.getContent());

        commentRepository.save(comment);
    }

    @Override
    @Transactional
    public void deleteComment(long reviewId, long commentId) {
        Comment comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.COMMENT_NOT_FOUND));

        if (comment.isDeleted()) {
            throw new BusinessLogicException(ExceptionCode.COMMENT_ALREADY_DELETED);
        }

        comment.deleteComment();
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

    private Comment getParent(Long id) {
        if (id == null) return null;
        return commentRepository.findById(id).orElse(null);
    }
}
