package com.apink.poppin.api.manager.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor
public class ManagerDTO {
    private Long managerTsid;
    private String nickname;
    private String id;
    private String password;
    private String img;
}
