package com.seungg.boardback.dto.response.board;

import com.seungg.boardback.common.ResponseCode;
import com.seungg.boardback.common.ResponseMessage;
import com.seungg.boardback.dto.object.BoardListItem;
import com.seungg.boardback.dto.response.ResponseDto;
import com.seungg.boardback.entity.BoardListViewEntity;

import lombok.Getter;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@Getter
public class GetTop3BoardListResponseDto extends ResponseDto {
    private List<BoardListItem> top3List;
    
    private GetTop3BoardListResponseDto(List<BoardListViewEntity> BoardEntities) {
        super(ResponseCode.SUCCESS, ResponseMessage.SUCCESS);
        this.top3List = BoardListItem.getList(BoardEntities);
    }

    public static ResponseEntity<GetTop3BoardListResponseDto> success(List<BoardListViewEntity> BoardEntities) {
        GetTop3BoardListResponseDto result = new GetTop3BoardListResponseDto(BoardEntities);
        return ResponseEntity.status(HttpStatus.OK).body(result);
    }
}
