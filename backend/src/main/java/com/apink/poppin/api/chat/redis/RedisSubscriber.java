package com.apink.poppin.api.chat.redis;

import com.apink.poppin.api.chat.dto.ChatMessageDTO;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Slf4j
@Service
public class RedisSubscriber {

    private final ObjectMapper objectMapper;
    private final SimpMessagingTemplate template;

    // Redis에서 메시지가 발행(publish) 되면 대기하고있던 RedisSubscriber가 해당 메시지를 받아서 처리
    public void sendMessage(String publishMessage) {
        try {
            ChatMessageDTO chatDto =
                    objectMapper.readValue(publishMessage, ChatMessageDTO.class);

            log.info("Redis Subscriber message : {}",chatDto.getMessage());

            // 채팅방을 구독한 클라이언트에게 메시지 발송
            template.convertAndSend("/sub/popup/"+chatDto.getPopupId(), chatDto);
        } catch (Exception e) {
            log.error("Exception {}", e);
        }
    }


}
