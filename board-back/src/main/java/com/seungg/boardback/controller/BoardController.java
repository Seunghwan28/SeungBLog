package com.seungg.boardback.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.seungg.boardback.dto.request.board.PostBoardRequestDto;
import com.seungg.boardback.dto.response.board.PostBoardResponseDto;
import com.seungg.boardback.dto.request.board.PostCommentRequestDto;
import com.seungg.boardback.dto.response.board.PostCommentResponseDto;
import com.seungg.boardback.dto.response.board.PutFavoriteResponseDto;
import com.seungg.boardback.dto.response.board.IncreaseViewCountResponseDto;
import com.seungg.boardback.dto.response.board.GetBoardResponseDto;
import com.seungg.boardback.dto.response.board.GetFavoriteListResponseDto;
import com.seungg.boardback.dto.response.board.GetCommentListResponseDto;
import com.seungg.boardback.dto.response.board.DeleteBoardResponseDto;

import com.seungg.boardback.service.BoardService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PutMapping;


@RestController
@RequestMapping("/api/v1/board")
@RequiredArgsConstructor
public class BoardController {

    private final BoardService boardService;

    @GetMapping("/{boardNumber}")
  public ResponseEntity<? super GetBoardResponseDto> getBoard(
  @PathVariable("boardNumber") Integer boardNumber
) {
   ResponseEntity<? super GetBoardResponseDto> response = boardService.getBoard(boardNumber);
   return response;
}

    @GetMapping("/{boardNumber}/favorite-list")
    public ResponseEntity<? super GetFavoriteListResponseDto> getFavoriteList(
    @PathVariable("boardNumber") Integer boardNumber
    ) {
    ResponseEntity<? super GetFavoriteListResponseDto> response = boardService.getFavoriteList(boardNumber);
    return response;
    }

    @PostMapping("") 
    public ResponseEntity<? super PostBoardResponseDto> postBoard(
        @RequestBody @Valid PostBoardRequestDto requestBody,
        @AuthenticationPrincipal String email
    ) {
        ResponseEntity<? super PostBoardResponseDto> response = boardService.postBoard(requestBody, email);
        return response;
    }

    @PutMapping("/{boardNumber}/favorite")
    public ResponseEntity<? super PutFavoriteResponseDto> putFavorite(
        @PathVariable("boardNumber") Integer boardNumber,
        @AuthenticationPrincipal String email
    ) {
        ResponseEntity<? super PutFavoriteResponseDto> response = boardService.putFavorite(boardNumber, email);
        return response;
    }

    @PostMapping("/{boardNumber}/comment") 
    public ResponseEntity<? super PostCommentResponseDto> postComment(
        @RequestBody @Valid PostCommentRequestDto requestBody,
        @PathVariable("boardNumber") Integer boardNumber,
        @AuthenticationPrincipal String email
    ) {
        ResponseEntity<? super PostCommentResponseDto> response = boardService.postComment(requestBody, boardNumber, email);
        return response;
    }

    @GetMapping("/{boardNumber}/comment-list")
    public ResponseEntity<? super GetCommentListResponseDto> getCommentList(
    @PathVariable("boardNumber") Integer boardNumber
    ) {
    ResponseEntity<? super GetCommentListResponseDto> response = boardService.getCommentList(boardNumber);
    return response;
    }
    
    @GetMapping("/{boardNumber}/increase-view-count")
    public ResponseEntity<? super IncreaseViewCountResponseDto> increaseViewCount(
        @PathVariable("boardNumber") Integer boardNumber 
    ) {
        ResponseEntity<? super IncreaseViewCountResponseDto> response = boardService.increaseViewCount(boardNumber);
        return response;

    }

    @DeleteMapping("/{boardNumber}")
    public ResponseEntity<? super DeleteBoardResponseDto> deleteBoard(
        @PathVariable("boardNumber") Integer boardNumber,
        @AuthenticationPrincipal String email
    ) {
        ResponseEntity<? super DeleteBoardResponseDto> response = boardService.deleteBoard(boardNumber, email);
        return response;
    }
    
}
