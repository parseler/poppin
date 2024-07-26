package com.apink.poppin.common.auth.controller;

import com.apink.poppin.api.manager.dto.ManagerDto;
import com.apink.poppin.common.auth.service.AuthService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @GetMapping("/reissue")
    public ResponseEntity<?> reissue(HttpServletRequest request, HttpServletResponse response) {
        return authService.reissueToken(request, response);
    }

    @PostMapping("/join")
    public ResponseEntity<?> joinManager(@RequestBody ManagerDto.Join joinDto) {
        authService.joinManager(joinDto);

        return ResponseEntity.ok().build();
    }
}
