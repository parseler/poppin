package com.apink.rankingservice.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;

import java.time.LocalDate;

@Entity
@Builder
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class PopupRanking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY )
    private Long popupRankingId;

    @Column(nullable = false)
    private Long popupId;

    @Column(nullable = false)
    private int views;

    @Column(nullable = false)
    private int likes;

    @Column(nullable = false)
    private double reviewScore;

    @Column(nullable = false)
    private int reviewCount;

    @Column(nullable = false)
    private int reservations;

    @Column(nullable = true)
    private LocalDate creationDate;
}
