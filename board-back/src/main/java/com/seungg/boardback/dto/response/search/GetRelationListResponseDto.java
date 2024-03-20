package com.seungg.boardback.dto.response.search;

import com.seungg.boardback.common.ResponseCode;
import com.seungg.boardback.common.ResponseMessage;
import com.seungg.boardback.dto.response.ResponseDto;
import com.seungg.boardback.repository.resultSet.GetPopularListResultSet;
import com.seungg.boardback.repository.resultSet.GetRelationListResultSet;

import lombok.Getter;
import java.util.*;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@Getter
public class GetRelationListResponseDto extends ResponseDto {
    
    private List<String> relativeWordList;

    private GetRelationListResponseDto(List<GetRelationListResultSet> resultSets) {
        super(ResponseCode.SUCCESS, ResponseMessage.SUCCESS);

        List<String> relativeWordList = new ArrayList<>();
        for(GetRelationListResultSet resultSet: resultSets) {
            String relationWord = resultSet.getSearchWord();
            relativeWordList.add(relationWord);
        }
        this.relativeWordList = relativeWordList;
    }

    public static ResponseEntity<GetRelationListResponseDto> success(List<GetRelationListResultSet> resultSets) {
        GetRelationListResponseDto result = new GetRelationListResponseDto(resultSets);
        return ResponseEntity.status(HttpStatus.OK).body(result);
    }
}
