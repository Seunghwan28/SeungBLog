package com.seungg.boardback.filter;

import java.io.IOException;

import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import com.seungg.boardback.provider.JwtProvider;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor //롬복에서 필수 생성자를 만들어줄 수 있다. (final을 필수로 인식)
public class JwtAuthenticationFilter extends OncePerRequestFilter{

    private final JwtProvider jwtProvider;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        try{
            String token = parseBearerToken(request); //밑에서 토큰 따오기

        if(token==null) { //따온게 null이면, 즉 잘못된경우 필터에서 걸러서 controller로 안 보냄
            filterChain.doFilter(request, response); //바로 내보내기
            return;
        }

        String email = jwtProvider.validate(token); //email꺼내오기
        if(email==null) {
            filterChain.doFilter(request, response); //email이 null은 토큰 만료됐거나, signing key가 안 맞거나
            return;
        }

        AbstractAuthenticationToken authenticationToken = //filter에서 context에 등록하는 과정
           new UsernamePasswordAuthenticationToken(email, null, AuthorityUtils.NO_AUTHORITIES); //id는 email, 비밀번호는 사용x여서 null, 권한은 일단 노권한
        authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request)); //인증요청에 대한 세부정보 작성가능

        SecurityContext securityContext = SecurityContextHolder.createEmptyContext(); //비어있는 context는 만듦
        securityContext.setAuthentication(authenticationToken); //비어있는 context에다가 추가해주는 과정

        SecurityContextHolder.setContext(securityContext); //외부에서 사용할 수 있도록 홀더에다가 넣어줌.

        }catch(Exception exception) {
            exception.printStackTrace();
        }
        filterChain.doFilter(request, response); //context에다가 이메일 넣어줬으면 다음 필터로 넘김

    }

    private String parseBearerToken(HttpServletRequest request) {
        String authorization = request.getHeader("Authorization"); //인증된거 토큰 뽑아오는 과정

        boolean hasAuthorization = StringUtils.hasText(authorization); //hasText는 null이거나 길이가 0이거나, 공백으로만 채워져있으면 false반환
        if(!hasAuthorization) return null; // authorization에 이상이 있으면 null리턴

        boolean isBearer = authorization.startsWith("Bearer "); //그 뽑아온게 bearer토큰인지 보는 것
        if(!isBearer) return null; //아니면 null리턴

        String token = authorization.substring(7); //bearer로시작하니까 7번째부터 따오면 됨
        return token;
    }

}
