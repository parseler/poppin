package com.apink.poppin.api.popup.dto;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.Date;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class PopupDTO {

    private Long popupId;
    private String name;
    private LocalDate startDate;
    private LocalDate endDate;

    private String hours;
    private String snsUrl;
    private String pageUrl;

    private String content;
    private String description;

    private String address;
    private Double lat;
    private Double lon;

    private int heart;
    private int hit;
    private Double rating;

    private boolean deleted;

    private Long managerTsId;

}
