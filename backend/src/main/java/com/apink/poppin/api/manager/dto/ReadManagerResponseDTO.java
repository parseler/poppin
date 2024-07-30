package com.apink.poppin.api.manager.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ReadManagerResponseDTO {
    private Long managerTsid;
    private String nickname;
    private String img;
}
