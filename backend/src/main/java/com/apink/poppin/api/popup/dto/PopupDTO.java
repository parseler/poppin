package com.apink.poppin.api.popup.dto;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PopupDTO {

    private Long popupId;
    private String name;
    private Date startDate;
    private Date endDate;


}
