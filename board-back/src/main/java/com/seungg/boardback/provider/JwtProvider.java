package com.seungg.boardback.provider;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

@Component
public class JwtProvider {

    @Value("${secret-key}")
    private String secretKey;

    public String create(String email) { //email을 가져와서 토큰으로 

        Date expiredDate = Date.from(Instant.now().plus(1, ChronoUnit.HOURS)); // 한시간 만료 단위

        Key key = Keys.hmacShaKeyFor(secretKey.getBytes(StandardCharsets.UTF_8));

        return Jwts.builder() //jwt 만들기
           .signWith(key, SignatureAlgorithm.HS256) //알고리즘 선택과, 시크릿 키 설정
           .setSubject(email).setIssuedAt(new Date()).setExpiration(expiredDate) //주체는 email, setIssued생성시간 => 지금 시간으로 만료 시간은 위에꺼
           .compact(); // 축소해서 밑에 리턴
    }

    public String validate(String jwt) { //검증하는거 검증해서 jwt를 받아서 검증하고 풀어서 payload를 꺼내서 주기

        Claims claims = null;

        Key key = Keys.hmacShaKeyFor(secretKey.getBytes(StandardCharsets.UTF_8));

        try{
            claims = Jwts.parserBuilder()
               .setSigningKey(key)
               .build()
               .parseClaimsJws(jwt)
               .getBody(); //잘되면 jwt의 바디 갖고오기
        } catch(Exception exception) {
            exception.printStackTrace();
            return null;
        }
        return claims.getSubject();

    }
}
