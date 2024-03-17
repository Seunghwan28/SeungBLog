package com.seungg.boardback.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;
import com.seungg.boardback.entity.SearchLogEntity;
import com.seungg.boardback.repository.resultSet.GetPopularListResultSet;

@Repository
public interface SearchLogRepository extends JpaRepository<SearchLogEntity, Integer>{

    @Query(
        value = 
        "SELECT search_word AS searchWord, count(search_word) AS count " +
        "FROM search_log " +
        "WHERE relation IS FALSE " +
        "GROUP BY search_word " +
        "ORDER BY count DESC " +
        "LIMIT 15 ",
        nativeQuery = true
    )
    List<GetPopularListResultSet> getPopularList();
}
