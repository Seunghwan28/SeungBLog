package com.seungg.boardback.service;

import org.springframework.http.ResponseEntity;

import com.seungg.boardback.dto.response.search.GetPopularListResponseDto;

public interface SearchService {
    
    ResponseEntity<? super GetPopularListResponseDto> getPopularList();
}
