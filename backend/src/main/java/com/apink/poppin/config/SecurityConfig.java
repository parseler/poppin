package com.apink.poppin.config;

//import com.apink.poppin.api.manager.repository.ManagerRepository;
import com.apink.poppin.common.auth.filter.CustomLogoutFilter;
import com.apink.poppin.common.auth.filter.JwtAuthenticationFilter;
//import com.apink.poppin.common.auth.filter.LoginFilter;
//import com.apink.poppin.common.auth.repository.ManagerRefreshTokenRepository;
import com.apink.poppin.common.auth.filter.LoginFilter;
import com.apink.poppin.common.auth.repository.CustomClientRegistrationRepo;
import com.apink.poppin.common.auth.service.AuthService;
import com.apink.poppin.common.oauth.CustomOAuth2SuccessHandler;
import com.apink.poppin.common.oauth.CustomOAuth2UserService;
import com.apink.poppin.common.util.JwtTokenUtil;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.authentication.logout.LogoutFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;

import java.util.Collections;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtTokenUtil jwtTokenUtil;
//    private final ManagerRepository managerRepository;
    private final AuthService authService;
//    private final ManagerRefreshTokenRepository managerRefreshTokenRepository;
    private final CustomOAuth2UserService customOAuth2UserService;
    private final CustomOAuth2SuccessHandler customOAuth2SuccessHandler;
    private final CustomClientRegistrationRepo customClientRegistrationRepo;

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration configuration) throws Exception {
        return configuration.getAuthenticationManager();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http, AuthenticationConfiguration authenticationConfiguration) throws Exception {

        http
                .cors(corsCustomizer -> corsCustomizer.configurationSource(new CorsConfigurationSource() {
                    @Override
                    public CorsConfiguration getCorsConfiguration(HttpServletRequest request) {

                        CorsConfiguration configuration = new CorsConfiguration();

                        configuration.setAllowedOrigins(Collections.singletonList("http://localhost:3000"));
                        // 모든 요청 허용
                        configuration.setAllowedMethods(Collections.singletonList("*"));
                        // credentials 모두 받기
                        configuration.setAllowCredentials(true);
                        // header 전부 허용
                        configuration.setAllowedHeaders(Collections.singletonList("*"));
                        configuration.setMaxAge(3600L);

                        // 우리쪽에서 데이터를 줄 경우, 웹 페이지에서 보이게 할 수 있는 방법
                        // 반환하는 쿠키와 authorization을 설정해야 함
                        // 그래야 cookie와 jwt 토큰을 얻을 수 있음
                        configuration.setExposedHeaders(Collections.singletonList("Set-Cookie"));
                        configuration.setExposedHeaders(Collections.singletonList("Authorization"));

                        return null;
                    }
                }));

        http
                .csrf((csrf) -> csrf.disable());

        http
                .httpBasic((basic) -> basic.disable());

        http
                .formLogin((form) -> form.disable());

        http
                .authorizeHttpRequests((auth) -> auth
                        .anyRequest().permitAll()
//                        .requestMatchers("/login", "/logout").permitAll()
//                        .requestMatchers("/api/users/**").hasRole("USER")
//                        .requestMatchers("/api/users/nickname").permitAll()
//                        .requestMatchers("/api/managers/**").hasRole("ADMIN")
//                        .requestMatchers("/api/managers/me/**").hasRole("MANAGER")
//                        .requestMatchers(HttpMethod.GET, "/api/popups/**").permitAll()
//                        .requestMatchers(HttpMethod.POST, "/api/popups/**").hasRole("USER")
//                        .requestMatchers(HttpMethod.GET, "/api/popups/*/pre-reservations").hasRole("MANAGER")
//                        .requestMatchers(HttpMethod.POST, "/api/popups").hasRole("MANAGER")
//                        .requestMatchers("/api/popups/*/onsite-reservations").hasRole("MANAGER")
//                        .requestMatchers(HttpMethod.DELETE, "/api/popups").hasRole("ADMIN")
//                        .requestMatchers(HttpMethod.DELETE, "/api/popups/*/pre-reservations/*").hasRole("USER")
//                        .requestMatchers(HttpMethod.PUT, "/api/popups/**").hasRole("MANAGER")
//                        .requestMatchers("/api/reviews/**").hasRole("USER")
//                        .requestMatchers(HttpMethod.GET, "/api/reviews/*").permitAll()
//                        .requestMatchers("/api/onsitereseravations/**").permitAll()
//                        .requestMatchers(HttpMethod.PUT, "/api/onsitereseravations").hasRole("MANAGER")
//                        .requestMatchers("/api/auth/**").permitAll()
//                        .requestMatchers("/api/auth/join", "/api/admins/**").hasRole("ADMIN")
//                        .anyRequest().authenticated()
                );

        http
                .addFilterBefore(new JwtAuthenticationFilter(jwtTokenUtil), LoginFilter.class)
                .addFilterBefore(new CustomLogoutFilter(jwtTokenUtil, authService), LogoutFilter.class)
                .addFilterAt(new LoginFilter(authenticationManager(authenticationConfiguration), jwtTokenUtil), UsernamePasswordAuthenticationFilter.class);

        http
                .oauth2Login((oauth2) -> oauth2
                        .clientRegistrationRepository(customClientRegistrationRepo.clientRegistrationRepository())
                        .userInfoEndpoint((userInfoEndpointConfig) -> userInfoEndpointConfig
                                .userService(customOAuth2UserService))
                        .successHandler(customOAuth2SuccessHandler)
                );

        http
                .sessionManagement((session) -> session
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS));

        return http.build();
    }

}
