package com.seungg.boardback.service;

import org.springframework.http.ResponseEntity;

import com.seungg.boardback.dto.response.search.GetPopularListResponseDto;
import com.seungg.boardback.dto.response.search.GetRelationListResponseDto;


public interface SearchService {
    
    ResponseEntity<? super GetPopularListResponseDto> getPopularList();
    ResponseEntity<? super GetRelationListResponseDto> getRelationList(String searchWord);
}
