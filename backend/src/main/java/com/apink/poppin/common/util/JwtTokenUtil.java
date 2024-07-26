package com.apink.poppin.common.util;

import io.jsonwebtoken.Jwts;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.util.Date;

@Component
public class JwtTokenUtil {

    private SecretKey secretKey;

    public JwtTokenUtil(@Value("${spring.jwt.secret}") String secret) {
        secretKey = new SecretKeySpec(secret.getBytes(StandardCharsets.UTF_8), Jwts.SIG.HS256.key().build().getAlgorithm());
    }

    public Long getUsername(String token) {
        System.out.println(Jwts.parser().verifyWith(secretKey).build().parseSignedClaims(token).getPayload().get("username", Long.class));
        return Jwts.parser().verifyWith(secretKey).build().parseSignedClaims(token).getPayload().get("username", Long.class);
    }

    public String getRole(String token) {System.out.println(Jwts.parser().verifyWith(secretKey).build().parseSignedClaims(token).getPayload().get("role", String.class));
        return Jwts.parser().verifyWith(secretKey).build().parseSignedClaims(token).getPayload().get("role", String.class);
    }

    public String getCategory(String token) {
        return Jwts.parser().verifyWith(secretKey).build().parseSignedClaims(token).getPayload().get("category", String.class);
    }

    public Boolean isExpired(String token) {

        return Jwts.parser().verifyWith(secretKey).build().parseSignedClaims(token).getPayload().getExpiration().before(new Date());
    }

    public String extractToken(String token) {
        if (token != null && token.startsWith("Bearer ")) {
            return token.substring(7).trim();
        }
        return null;
    }

    public String createToken(String category, long userTsid, String role, Long expiredMs) {
        return Jwts.builder()
                .claim("category", category)
                .claim("username", userTsid)
                .claim("role", role)
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis() + expiredMs))
                .signWith(secretKey)
                .compact();
    }

}
