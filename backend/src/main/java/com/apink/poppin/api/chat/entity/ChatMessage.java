package com.apink.poppin.api.chat.entity;

import com.apink.poppin.api.popup.entity.Popup;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalTime;

@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Document("chatMessage")
public class ChatMessage {

    @Id
    private String chatId;

    private Long popupId;

    private String sender;
    private String senderImg;

    private String message;

    @CreatedDate
    private LocalTime sendTime;
}
