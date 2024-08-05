package com.apink.poppin.api.manager.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor
public class ReadManagerResponseDTO {
    private Long managerTsid;
    private String nickname;
    private String img;
}