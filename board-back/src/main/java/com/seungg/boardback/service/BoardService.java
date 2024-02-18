package com.seungg.boardback.service;

import org.springframework.http.ResponseEntity;

import com.seungg.boardback.dto.request.board.PostBoardRequestDto;
import com.seungg.boardback.dto.response.board.PostBoardResponseDto;

public interface BoardService {
    ResponseEntity<? super PostBoardResponseDto> postBoard(PostBoardRequestDto dto, String email);
    
}