import React, { useEffect, useState } from 'react'
import './style.css'
import Top3Item from 'components/Top3Item'
import { BoardListItem } from 'types/interface'
import { latestBoardListMock, top3BoardListMock } from 'mocks'
import BoardItem from 'components/BoardItem'
import { useNavigate } from 'react-router-dom'
import { SEARCH_PATH } from 'constant'

//          Component : 메인 화면 컴포넌트          //
export default function Main() {

  //          function: 네비게이트 함수            //
  const navigate = useNavigate();

  //          Component : 메인 화면 상단 컴포넌트          //
  const MainTop = () => {

    //          state: 주간 top3 게시물 리스트 상태          //
    const [top3BoardList, setTop3BoardList] = useState<BoardListItem[]>([]);

    //          Effect: 첫 마운트시 실행될 함수           //
    useEffect(() => {
      setTop3BoardList(top3BoardListMock);
    },[]);

    //          Render : 메인 화면 상단 컴포넌트  렌더링        //
     return (
     <div id='main-top-wrapper'>
        <div className='main-top-container'>
          <div className='main-top-title'>{'Seungs Board에서\n다양한 이야기를 나눠보세요'}</div>
          <div className='main-top-contents-box'>
            <div className='main-top-contents-title'>{'주간 TOP 3 게시글'}</div>
            <div className='main-top-contents'>
              {top3BoardList.map(top3BoardListItem => <Top3Item top3ListItem={top3BoardListItem}/>)}
            </div>
          </div>
        </div>
     </div>
    )
  }

  //          Component : 메인 화면 하단 컴포넌트          //
  const MainBottom = () => {

    //          state: 최신 게시물 리스트 상태 (임시)           //
    const [latestBoardList, setLatestBoardList] = useState<BoardListItem[]>([]);

    //          state: 인기 검색어 리스트 상태           //
    const [popularWordList, setPopularWordList] = useState<string[]>([]);

    //          event handler: 인기 검색어 클릭 이벤트 처리            //
    const onPopularWordClickHandler = (word: string) => {
      navigate(SEARCH_PATH(word));
    }
    
    //          Effect: 첫 마운트 시 실행될 함수             //
    useEffect(() => {
      setLatestBoardList(latestBoardListMock);
      setPopularWordList(['토토야', '국디서', '도야지']);
    },[]);  


    //          Render : 메인 화면 하단 컴포넌트  렌더링        //
   return (
     <div id='main-bottom-wrapper'>
      <div className='main-bottom-container'>
        <div className='main-bottom-title'>{'최신 게시물'}</div>
        <div className='main-bottom-contents-box'>
          <div className='main-bottom-latest-contents-box'>
            {latestBoardList.map(boardListItem => <BoardItem boardListItem={boardListItem}/>)}
          </div>
          <div className='main-bottom-popular-word-box'>
            <div className='main-bottom-popular-card'>
              <div className='main-bottom-popular-card-container'>
                <div className='main-bottom-popular-card-title'>{'인기 검색어'}</div>
                <div className='main-bottom-popular-card-contents'>
                  {popularWordList.map(word => <div className='word-badge' onClick={() => onPopularWordClickHandler(word)}>{word}</div>)}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='main-bottom-pagination-box'></div>
        {/*<Pagination /> */}
      </div>
     </div>
   )
  }

  //          Render : 메인 화면 컴포넌트  렌더링        //
  return (
    <>
      <MainTop />
      <MainBottom />
    </>
  )
}
