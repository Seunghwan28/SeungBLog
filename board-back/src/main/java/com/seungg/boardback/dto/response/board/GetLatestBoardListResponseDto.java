package com.seungg.boardback.dto.response.board;

import com.seungg.boardback.common.ResponseCode;
import com.seungg.boardback.common.ResponseMessage;
import com.seungg.boardback.dto.object.BoardListItem;
import com.seungg.boardback.dto.response.ResponseDto;
import com.seungg.boardback.entity.BoardListViewEntity;

import java.util.*;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import lombok.Getter;

@Getter
public class GetLatestBoardListResponseDto extends ResponseDto {

    private List<BoardListItem> latestList;

    private GetLatestBoardListResponseDto(List<BoardListViewEntity> BoardEntities) {
        super(ResponseCode.SUCCESS, ResponseMessage.SUCCESS);
        this.latestList = BoardListItem.getList(BoardEntities);
    }

    public static ResponseEntity<GetLatestBoardListResponseDto> success(List<BoardListViewEntity> BoardEntities) {
        GetLatestBoardListResponseDto result = new GetLatestBoardListResponseDto(BoardEntities);
        return ResponseEntity.status(HttpStatus.OK).body(result);
    }
    
}
