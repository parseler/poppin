package com.apink.poppin.api.review.service;

import com.apink.poppin.api.review.dto.CommentDto;
import com.apink.poppin.api.review.entity.Comment;
import com.apink.poppin.api.review.entity.Review;
import com.apink.poppin.api.review.repository.CommentRepository;
import com.apink.poppin.api.review.repository.ReviewRepository;
import com.apink.poppin.api.test.entity.User;
import com.apink.poppin.api.test.repository.UserRepository;
import com.apink.poppin.common.exception.dto.BusinessLogicException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.test.context.support.WithMockUser;

import java.time.Instant;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class CommentServiceImplTest {

    @InjectMocks
    private CommentServiceImpl commentService;

    @Mock
    private CommentRepository commentRepository;

    @Mock
    private ReviewRepository reviewRepository;

    @Mock
    private UserRepository userRepository;

    private CommentDto commentDto;

    @BeforeEach
    public void setUp() {
        commentDto = CommentDto.builder()
                .commentId(1L)
                .userTsid(1L)
                .reviewId(1L)
                .content("Initial content")
                .createdAt(Instant.now())
                .parent(1L)
                .build();
    }

    @Test
    @WithMockUser
    public void createCommentSuccess() {

        Review review = mock(Review.class);
        User user = mock(User.class);
        Comment comment = Comment.builder()
                .content(commentDto.getContent())
                .createdAt(Instant.now())
                .build();

        when(reviewRepository.findById(anyLong())).thenReturn(Optional.of(review));
        when(userRepository.findById(anyLong())).thenReturn(Optional.of(user));
        when(commentRepository.findById(anyLong())).thenReturn(Optional.ofNullable(any(Comment.class)));
        when(commentRepository.save(comment)).thenReturn(comment);

        Comment createdComment = commentService.createComment(commentDto);

        assertEquals(commentDto.getContent(), createdComment.getContent());
        verify(reviewRepository, times(1)).findById(anyLong());
        verify(userRepository, times(1)).findById(anyLong());
        verify(commentRepository, times(1)).findById(anyLong());
        verify(commentRepository, times(1)).save(any(Comment.class));
    }

    @Test
    @WithMockUser
    public void updateCommentSuccess() {
        Comment comment = Comment.builder()
                .content("Update Content")
                .createdAt(Instant.now())
                .build();

        when(commentRepository.findById(anyLong())).thenReturn(Optional.of(comment));

        commentService.updateComment(commentDto);

        assertEquals(comment.getContent(), commentDto.getContent());
        verify(commentRepository, times(1)).findById(anyLong());
        verify(commentRepository, times(1)).save(any(Comment.class));
    }

    @Test
    @WithMockUser
    public void updateDeletedComment() {
        Comment comment = Comment.builder()
                .content("Deleted Content")
                .createdAt(Instant.now())
                .isDeleted(true)
                .build();

        when(commentRepository.findById(anyLong())).thenReturn(Optional.of(comment));

        BusinessLogicException exception = assertThrows(BusinessLogicException.class,
                () -> commentService.updateComment(commentDto));

        assertEquals(exception.getMessage(), "Comment already deleted");
    }
}
