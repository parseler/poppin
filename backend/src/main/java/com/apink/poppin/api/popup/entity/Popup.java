package com.apink.poppin.api.popup.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;

import java.time.LocalDate;
import java.util.Date;

@Builder
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Popup {

    @Id
    @GeneratedValue
    @Column(name="popup_id")
    private Long popupId;

//    @OneToOne(mappedBy = "")
//    private Manager manager;

    @NotNull
    private String name;
    @NotNull
    private LocalDate startDate;
    @NotNull
    private LocalDate endDate;
    @NotNull
    private String hours;
    @NotNull
    private String description;

    private String snsUrl;
    private String pageUrl;

    @NotNull
    private String content;

//     위도 경도
    @NotNull
    private Double lat;
    @NotNull
    private Double lon;

    @ColumnDefault("0")
    private int heart;
    @ColumnDefault("0")
    private int hit;
    @ColumnDefault("0.0")
    private Double rating;

}
