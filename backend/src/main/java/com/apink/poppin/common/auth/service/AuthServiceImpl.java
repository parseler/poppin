package com.apink.poppin.common.auth.service;

import com.apink.poppin.api.manager.dto.CreateManagerRequestDTO;
import com.apink.poppin.api.manager.entity.Manager;
import com.apink.poppin.api.manager.repository.ManagerRepository;
import com.apink.poppin.common.auth.repository.ManagerRefreshTokenRepository;
import com.apink.poppin.common.auth.repository.UserRefreshTokenRepository;
import com.apink.poppin.common.util.JwtTokenUtil;
import com.apink.poppin.common.util.SnowflakeTsidUtil;
import io.jsonwebtoken.ExpiredJwtException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final ManagerRepository managerRepository;
    private final UserRefreshTokenRepository userRefreshTokenRepository;
    private final JwtTokenUtil jwtTokenUtil;
    private final ManagerRefreshTokenRepository managerRefreshTokenRepository;
    private final SnowflakeTsidUtil snowflakeTsidUtil;

    @Override
    @Transactional
    public ResponseEntity<?> reissueToken(HttpServletRequest request, HttpServletResponse response) {
        // 쿠키에서 refresh 토큰 추출
        String refresh = null;
        Cookie[] cookies = request.getCookies();
        for (Cookie cookie : cookies) {
            if (cookie.getName().equals("refresh")) {

                refresh = cookie.getValue();
            }
        }

        // refresh 유무 체크
        if (refresh == null) {
            return new ResponseEntity<>("refresh token null", HttpStatus.BAD_REQUEST);
        }

        // refresh 만료 체크
        try {
            jwtTokenUtil.isExpired(refresh);
        } catch (ExpiredJwtException e) {
            return new ResponseEntity<>("refresh token expired", HttpStatus.BAD_REQUEST);
        }

        // 토큰이 refresh인지 확인 (발급시 페이로드에 명시)
        String category = jwtTokenUtil.getCategory(refresh);

        // DB에 저장되어 있는지 확인
        Boolean isExist = false;

        String role = jwtTokenUtil.getRole(refresh);

        if(role.equals("manager")) {
            isExist = managerRefreshTokenRepository.existsManagerRefreshTokenByRefresh(refresh);
        } else {
            isExist = userRefreshTokenRepository.existsUserRefreshTokenByRefresh(refresh);
        }

        if(!isExist) {
            return new ResponseEntity<>("invalid refresh token", HttpStatus.BAD_REQUEST);
        }

        if (!category.equals("refresh")) {
            return new ResponseEntity<>("invalid refresh token", HttpStatus.BAD_REQUEST);
        }

        long username = jwtTokenUtil.getUsername(refresh);

        //make new JWT
        String newAccess = jwtTokenUtil.createToken("access", username, role, 600000L);
        System.out.println(newAccess);
        //response
        response.setHeader("Authorization", "Bearer " + newAccess);

        return new ResponseEntity<>(HttpStatus.OK);
    }


    @Override
    @Transactional
    public void deleteRefreshToken(String refreshToken, String role) {
        if ("ROLE_MANAGER".equals(role)) {
            managerRefreshTokenRepository.deleteManagerRefreshTokenByRefresh(refreshToken);
        } else {
            userRefreshTokenRepository.deleteUserRefreshTokenByRefresh(refreshToken);
        }
    }

    @Override
    @Transactional
    public boolean isExist(String refreshToken, String role) {
        if ("ROLE_MANAGER".equals(role)) {
            return managerRefreshTokenRepository.existsManagerRefreshTokenByRefresh(refreshToken);
        } else {
            return userRefreshTokenRepository.existsUserRefreshTokenByRefresh(refreshToken);
        }
    }

}
