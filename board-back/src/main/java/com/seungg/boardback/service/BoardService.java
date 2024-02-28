package com.seungg.boardback.service;

import org.springframework.http.ResponseEntity;

import com.seungg.boardback.dto.request.board.PostBoardRequestDto;
import com.seungg.boardback.dto.response.board.GetBoardResponseDto;
import com.seungg.boardback.dto.response.board.PostBoardResponseDto;
import com.seungg.boardback.dto.response.board.PutFavoriteResponseDto;
import com.seungg.boardback.dto.response.board.GetFavoriteListResponseDto;


public interface BoardService {
    ResponseEntity<? super GetBoardResponseDto> getBoard(Integer boardNumber);
    ResponseEntity<? super PostBoardResponseDto> postBoard(PostBoardRequestDto dto, String email);
    ResponseEntity<? super PutFavoriteResponseDto> putFavorite(Integer boardNumber, String email);
    ResponseEntity<? super GetFavoriteListResponseDto> getFavoriteList(Integer boardNumber);
}
