package com.seungg.boardback.service.implement;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.seungg.boardback.dto.response.ResponseDto;
import com.seungg.boardback.dto.response.search.GetPopularListResponseDto;
import com.seungg.boardback.dto.response.search.GetRelationListResponseDto;
import com.seungg.boardback.repository.SearchLogRepository;
import com.seungg.boardback.service.SearchService;
import com.seungg.boardback.repository.resultSet.GetPopularListResultSet;
import com.seungg.boardback.repository.resultSet.GetRelationListResultSet;

import java.util.*;



import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class SearchServiceImplement implements SearchService {

    private final SearchLogRepository searchLogRepository;

    @Override
    public ResponseEntity<? super GetPopularListResponseDto> getPopularList() {

        List<GetPopularListResultSet> resultSets = new ArrayList<>();

        try{
            resultSets = searchLogRepository.getPopularList();


        }catch(Exception exception) {
            exception.printStackTrace();
            return ResponseDto.databaseError();
        }

        return GetPopularListResponseDto.success(resultSets);
    }

    @Override
    public ResponseEntity<? super GetRelationListResponseDto> getRelationList(String searchWord) {

        List<GetRelationListResultSet> resultSets = new ArrayList<>();

        try{

            resultSets = searchLogRepository.getRelationList(searchWord);

        }catch(Exception exception) {
            exception.printStackTrace();
            return ResponseDto.databaseError();
        }
        return GetRelationListResponseDto.success(resultSets);
    }
    
}
