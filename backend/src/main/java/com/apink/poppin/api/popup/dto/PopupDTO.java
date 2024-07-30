package com.apink.poppin.api.popup.dto;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PopupDTO {

    private Long popupId;
    private String name;
    private LocalDate startDate;
    private LocalDate endDate;
    private int heart;

}
