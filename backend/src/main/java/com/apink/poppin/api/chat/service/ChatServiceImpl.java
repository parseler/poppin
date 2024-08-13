package com.apink.poppin.api.chat.service;

import com.apink.poppin.api.chat.dto.ChatMessageDTO;
import com.apink.poppin.api.chat.entity.ChatMessage;
import com.apink.poppin.api.chat.redis.RedisPublisher;
import com.apink.poppin.api.chat.repository.ChatMessageRepository;
import com.apink.poppin.api.popup.entity.Popup;
import com.apink.poppin.api.popup.repository.PopupRepository;
import com.apink.poppin.api.user.entity.User;
import com.apink.poppin.api.user.repository.UserRepository;
import com.apink.poppin.common.exception.dto.BusinessLogicException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

import static com.apink.poppin.common.exception.dto.ExceptionCode.USER_NOT_FOUND;

@Service
@RequiredArgsConstructor
public class ChatServiceImpl implements ChatService {

    private final ChatMessageRepository chatRepository;
    private final PopupRepository popupRepository;
    private final RedisPublisher redisPublisher;
    private final UserRepository userRepository;


    @Override
    public ChatMessage insertMessage(ChatMessageDTO chatDto) {
        // 유저 확인
        User user = userRepository.findUserByUserTsid(chatDto.getUserTsid())
                .orElseThrow(() -> new BusinessLogicException(USER_NOT_FOUND));

        // 팝업 확인
        Popup popup = popupRepository.findById(chatDto.getPopupId())
                .orElseThrow(() -> new IllegalArgumentException("Invalid popup ID"));

        ChatMessage chatMessage = ChatMessage.builder()
                .popupId(chatDto.getPopupId())
                .sender(user.getNickname())
                .senderImg(user.getImg())
                .message(chatDto.getMessage())
                .sendTime(chatDto.getSendTime())
                .build();

        System.out.println("mongodb before");

        // 몽고디비에 저장
        ChatMessage chat = chatRepository.save(chatMessage);

        System.out.println("mongodb after");

        // redis publish 호출
        redisPublisher.publish(chatDto);

        System.out.println("redis after");

        return chat;
    }


    @Override
    public List<ChatMessage> getChatHistory(Long popupId) {
        // 팝업 확인
        Popup popup = popupRepository.findById(popupId)
                .orElseThrow(() -> new IllegalArgumentException("Invalid popup ID"));
        List<ChatMessage> chatHistory = chatRepository.findAllByPopupId(popupId);

        return chatHistory;
    }
}
