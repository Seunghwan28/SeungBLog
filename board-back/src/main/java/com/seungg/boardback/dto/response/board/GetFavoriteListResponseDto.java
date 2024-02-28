package com.seungg.boardback.dto.response.board;

import com.seungg.boardback.dto.response.ResponseDto;
import com.seungg.boardback.entity.FavoriteEntity;
import com.seungg.boardback.repository.resultSet.GetFavoriteListResultSet;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.seungg.boardback.common.ResponseCode;
import com.seungg.boardback.common.ResponseMessage;
import com.seungg.boardback.dto.object.FavoriteListItem;


import lombok.Getter;

@Getter
public class GetFavoriteListResponseDto extends ResponseDto{

    private List<FavoriteListItem> favoriteList;

    private GetFavoriteListResponseDto(List<GetFavoriteListResultSet> resultSets) {
        super(ResponseCode.SUCCESS, ResponseMessage.SUCCESS);
        this.favoriteList = FavoriteListItem.copyList(resultSets);
    }

    public static ResponseEntity<GetFavoriteListResponseDto> success(List<GetFavoriteListResultSet> resultSet) {
        GetFavoriteListResponseDto result = new GetFavoriteListResponseDto(resultSet);
        return ResponseEntity.status(HttpStatus.OK).body(result);
    }

    public static ResponseEntity<ResponseDto> notExistBoard() {
        ResponseDto result = new ResponseDto(ResponseCode.NOT_EXISTED_BOARD, ResponseMessage.NOT_EXISTED_BOARD);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(result);
    }

    
}
