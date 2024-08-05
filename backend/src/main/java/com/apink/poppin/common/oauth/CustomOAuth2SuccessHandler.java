package com.apink.poppin.common.oauth;

import com.apink.poppin.api.user.entity.User;
import com.apink.poppin.api.user.repository.UserRepository;
import com.apink.poppin.common.auth.entity.UserRefreshToken;
import com.apink.poppin.common.auth.repository.UserRefreshTokenRepository;
import com.apink.poppin.common.util.JwtTokenUtil;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.Collection;
import java.util.Iterator;

@Component
@RequiredArgsConstructor
public class CustomOAuth2SuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    private final JwtTokenUtil jwtTokenUtil;
    private final UserRefreshTokenRepository userRefreshTokenRepository;
    private final UserRepository userRepository;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {

        long userTsid = Long.parseLong(authentication.getName());

        Collection<? extends GrantedAuthority> authorities = authentication.getAuthorities();
        Iterator<? extends GrantedAuthority> iterator = authorities.iterator();
        GrantedAuthority auth = iterator.next();
        String role = auth.getAuthority();

        String refresh = null;
        if(userRefreshTokenRepository.existsUserRefreshTokenByUser_UserTsid(userTsid)){
            String refreshToken = userRefreshTokenRepository.findUserRefreshTokenByUser_UserTsid(userTsid).getRefresh();
            if(!jwtTokenUtil.isExpired(refreshToken)) {
                refresh = refreshToken;
                response.addCookie(createCookie("refresh", refresh));
                response.sendRedirect("http://localhost:8080/main");
                return;
            }
        }

        refresh = jwtTokenUtil.createToken("refresh", userTsid, role, 8640000L);

        User user = userRepository.findUserByUserTsid(userTsid).get();

        UserRefreshToken refreshToken = UserRefreshToken.builder()
                .user(user)
                .refresh(refresh)
                .build();

        userRefreshTokenRepository.save(refreshToken);

        response.addCookie(createCookie("refresh", refresh));
        response.sendRedirect("http://localhost:8080/mypage/update");

    }

    private Cookie createCookie(String key, String value) {
        Cookie cookie = new Cookie(key, value);

        cookie.setMaxAge(24 * 60 * 60);
        cookie.setSecure(true);
        cookie.setPath("/");
        cookie.setHttpOnly(true);

        return cookie;
    }

//    public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
//        response.sendRedirect("http://localhost:8080/login?error=true");
//    }
}
