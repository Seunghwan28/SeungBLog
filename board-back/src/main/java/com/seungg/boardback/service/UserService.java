package com.seungg.boardback.service;

import org.springframework.http.ResponseEntity;

import com.seungg.boardback.dto.response.user.GetSignInUserResponseDto;

public interface UserService {
    ResponseEntity<? super GetSignInUserResponseDto> getSignInUser(String email);
    
}
