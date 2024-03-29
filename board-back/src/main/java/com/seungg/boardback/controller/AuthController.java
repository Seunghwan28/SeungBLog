package com.seungg.boardback.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.seungg.boardback.dto.request.auth.SignUpRequestDto;
import com.seungg.boardback.dto.response.auth.SignUpResponseDto;
import com.seungg.boardback.dto.request.auth.SignInRequestDto;
import com.seungg.boardback.dto.response.auth.SignInResponseDto;
import com.seungg.boardback.service.AuthService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/auth")
@CrossOrigin(origins = "http://localhost:3001")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;
    
    @PostMapping("/sign-up")
    public ResponseEntity<? super SignUpResponseDto> signUp(
        @RequestBody @Valid SignUpRequestDto requestBody
    ) {
        return authService.signUp(requestBody);
    }

    @PostMapping("/sign-in")
    public ResponseEntity<? super SignInResponseDto> signIn(
        @RequestBody @Valid SignInRequestDto requestBody
    ) {
        return authService.signIn(requestBody);
    }
}
