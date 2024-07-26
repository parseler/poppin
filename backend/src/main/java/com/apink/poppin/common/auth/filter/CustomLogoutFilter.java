package com.apink.poppin.common.auth.filter;

import com.apink.poppin.common.auth.repository.ManagerRefreshTokenRepository;
import com.apink.poppin.common.auth.repository.UserRefreshTokenRepository;
import com.apink.poppin.common.auth.service.AuthService;
import com.apink.poppin.common.util.JwtTokenUtil;
import io.jsonwebtoken.ExpiredJwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.web.filter.GenericFilterBean;

import java.io.IOException;

@RequiredArgsConstructor
public class CustomLogoutFilter extends GenericFilterBean {

    private final JwtTokenUtil jwtUtil;
    private final AuthService authService;

    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
        doFilter((HttpServletRequest) servletRequest, (HttpServletResponse) servletResponse, filterChain);
    }

    public void doFilter(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws IOException, ServletException {

        // uri 검사
        String requestURI = request.getRequestURI();
        if(!requestURI.matches("^/api/auth/logout$")){
            filterChain.doFilter(request, response);
            return;
        }

        // method 검사
        String requestMethod = request.getMethod();
        if(!requestMethod.equals("POST")) {
            filterChain.doFilter(request, response);
        }

        // refresh 토큰 추출
        String refresh = null;
        Cookie[] cookies = request.getCookies();
        for(Cookie cookie : cookies){
            if(cookie.getName().equals("refresh")) {
                refresh = cookie.getValue().trim();
            }
        }

        // refresh 토큰 검사 시작

        // refresh 토큰 존재 확인
        if(refresh == null) {
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            return;
        }

        // refresh 토큰 만료 확인
        try {
            jwtUtil.isExpired(refresh);
        } catch (ExpiredJwtException e) {
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            return;
        }

        // refresh 토큰인지 확인
        String category = jwtUtil.getCategory(refresh);
        if(!category.equals("refresh")) {
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
        }

        // DB에 존재하는지 확인
        String role = jwtUtil.getRole(refresh);
        Boolean isExist = authService.isExist(refresh, role);

        if(!isExist) {
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            return;
        }

        // 로그아웃 진행
        // Refresh 토큰 DB에서 제거
        authService.deleteRefreshToken(refresh, role);

        // RefreshToken Cookie 값 0
        Cookie cookie = new Cookie("refresh", null);
        cookie.setMaxAge(0);
        cookie.setPath("/");

        response.addCookie(cookie);
        response.setStatus(HttpServletResponse.SC_OK);
    }
}
