package com.apink.poppin.api.heart.entity;


import com.apink.poppin.api.popup.entity.Popup;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import static jakarta.persistence.FetchType.LAZY;

@Builder
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Heart {

    @Id
    @GeneratedValue
    @Column(name="heart_id")
    private long heartId;

//    @ManyToOne(fetch=LAZY)
//    @JoinColumn(name = "user_id", nullable = false)
//    private Member member;

    @ManyToOne(fetch=LAZY)
    @JoinColumn(name = "popup_id", nullable = false)
    private Popup popup;


}
