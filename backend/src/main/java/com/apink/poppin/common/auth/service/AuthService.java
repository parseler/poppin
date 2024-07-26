package com.apink.poppin.common.auth.service;

import com.apink.poppin.api.manager.dto.ManagerDto;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.ResponseEntity;

public interface AuthService {

    void joinManager(ManagerDto.Join joinDto);

    ResponseEntity<?> reissueToken(HttpServletRequest request, HttpServletResponse response);

    void deleteRefreshToken(String refreshToken, String role);

    boolean isExist(String refreshToken, String role);
}
