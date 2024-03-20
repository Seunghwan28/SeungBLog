package com.seungg.boardback.dto.response.board;

import com.seungg.boardback.common.ResponseCode;
import com.seungg.boardback.common.ResponseMessage;
import com.seungg.boardback.dto.object.BoardListItem;
import com.seungg.boardback.dto.response.ResponseDto;
import com.seungg.boardback.entity.BoardListViewEntity;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import lombok.Getter;

@Getter
public class GetSearchBoardListResponseDto extends ResponseDto {

    private List<BoardListItem> searchList;

    private GetSearchBoardListResponseDto(List<BoardListViewEntity> boardListViewEntities) {
        super(ResponseCode.SUCCESS, ResponseMessage.SUCCESS);
        this.searchList = BoardListItem.getList(boardListViewEntities);
    }

    public static ResponseEntity<GetSearchBoardListResponseDto> success(List<BoardListViewEntity> boardListViewEntities) {
        GetSearchBoardListResponseDto result = new GetSearchBoardListResponseDto(boardListViewEntities);
        return ResponseEntity.status(HttpStatus.OK).body(result);
    }
    
}
