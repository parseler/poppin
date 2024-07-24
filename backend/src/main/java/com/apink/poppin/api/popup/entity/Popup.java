package com.apink.poppin.api.popup.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Getter;

@Entity
@Getter
// 테스트용
public class Popup {

    @Id
    private Long popupId;
}
