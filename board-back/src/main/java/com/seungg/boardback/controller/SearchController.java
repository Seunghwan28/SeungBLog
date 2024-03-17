package com.seungg.boardback.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.seungg.boardback.dto.response.search.GetPopularListResponseDto;
import com.seungg.boardback.service.SearchService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping(value = "/api/v1/search")
@RequiredArgsConstructor
public class SearchController {

    private final SearchService searchService;

    @GetMapping("/popular-list")
    public ResponseEntity<? super GetPopularListResponseDto> getPopularList() {
        ResponseEntity<? super GetPopularListResponseDto> result = searchService.getPopularList();
        return result;
    }
    
}
