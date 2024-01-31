package com.seungg.boardback.service;

import org.springframework.http.ResponseEntity;

import com.seungg.boardback.dto.request.auth.SignUpRequestDto;
import com.seungg.boardback.dto.request.auth.SignInRequestDto;
import com.seungg.boardback.dto.response.auth.SignUpResponseDto;
import com.seungg.boardback.dto.response.auth.SignInResponseDto;


public interface AuthService {
    ResponseEntity<? super SignUpResponseDto> signUp(SignUpRequestDto dto);
    ResponseEntity<? super SignInResponseDto> signIn(SignInRequestDto dto);
}
