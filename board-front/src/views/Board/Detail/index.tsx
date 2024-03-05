import React, { useEffect, useState } from 'react'
import './style.css'
import { CommentListItem, FavoriteListItem } from 'types/interface';
import { commentListMock, favoriteListMock } from 'mocks';
import FavoriteItem from 'components/FavoriteItem';
import CommentItem from 'components/CommentItem';
import Pagination from 'components/Pagination';
const defaultProfileImage = require('assets/image/default_profile_image.jpg');


//          Component : 게사물 상세 화면 컴포넌트          //
export default function BoardDetail() {

  //          Component : 게사물 상세 상단 화면 컴포넌트          //
  const BoardDetailTop = () => {

  //           state: more 버튼 상태           //
  const [showMore, setShowMore] = useState<boolean>(false);

  //           event handler: more 버튼 클릭 이벤트 처리          //
  const onMoreButtomClickHandler = () => {
    setShowMore(!showMore);
  }


  //           Render : 게사물 상세 상단 화면 컴포넌트  렌더링       //
    return (
      <div id='board-detail-top'>
        <div className='board-detail-top-header'>
          <div className='board-detail-title'>{'하정민은 도야지인가?'}</div>
          <div className='board-detail-top-sub-box'>
            <div className='board-detail-write-info-box'>
              <div className='board-detail-writer-profile-image' style={{backgroundImage: `url(${defaultProfileImage})`}}></div>
              <div className='board-detail-writer-nickname'>{'ToTTo'}</div>
              <div className='board-detail-info-divider'>{'\|'}</div>
              <div className='board-detail-write-date'>{'2024. 03. 02.'}</div>
            </div>
            <div className='icon-button' onClick={onMoreButtomClickHandler}>
              <div className='icon more-icon'></div>
            </div>
            {showMore && 
            <div className='board-detail-more-box'>
              <div className='board-detail-update-button'>{'수정'}</div>
              <div className='divider'></div>
              <div className='board-detail-delete-button'>{'삭제'}</div>
            </div>}
          </div>
        </div>
        <div className='divider'></div>
        <div className='board-detail-top-main'>
          <div className='board-detail-main-text'>{'하정민은 도야지가 맞다... 그게 문제가 아니라 개강 너무 에바다.. 이번에 14학점 듣긴하지만 이 한사봉 한사봉은 왜 해야하는 것이지? 진짜 진짜 너무너무너무 귀찮다 후엥~~~~~ '}</div>
          <img className='board-detail-main-image' src='https://www.kalmbachfeeds.com/wp-content/uploads/2022/12/feeding-pigs-through-life-stages-article-1024x536.jpg' />
        </div>
      </div>
    );
  }

  //          Component : 게사물 상세 하단 화면 컴포넌트          //
  const BoardDetailBottom = () => {

    const[favoriteList, setFavoriteList] = useState<FavoriteListItem[]>([]);
    const[commentList, setCommentList] = useState<CommentListItem[]>([]);

    useEffect(() => {
      setFavoriteList(favoriteListMock);
      setCommentList(commentListMock);
    },[]);


  //           Render : 게사물 상세 하단 화면 컴포넌트  렌더링       //
    return (
    <div id='board-detail-bottom'>
      <div className='board-detail-bottom-button-box'>
        <div className='board-detail-bottom-button-group'>
          <div className='icon-button'>
            <div className='icon favorite-fill-icon'></div>
          </div>
          <div className='board-detail-bottom-button-text'>{`좋아요 ${8}`}</div>
          <div className='icon-button'>
            <div className='icon up-light-icon'></div>
          </div>
        </div>
        <div className='board-detail-bottom-button-group'>
          <div className='icon-button'>
            <div className='icon comment-icon'></div>
          </div>
          <div className='board-detail-bottom-button-text'>{`댓글 ${3}`}</div>
          <div className='icon-button'>
            <div className='icon up-light-icon'></div>
          </div>
        </div>
      </div>
      <div className='board-detail-bottom-favorite-box'>
        <div className='board-detail-bottom-favorite-container'>
          <div className='board-detail-bottom-favorite-title'>{'좋아요 '}<span className='emphasis'>{8}</span></div>
          <div className='board-detail-bottom-favorite-contents'>
            {favoriteList.map(item => <FavoriteItem favoriteListItem={item} />)}
          </div>
        </div>
      </div>
      <div className='board-detail-bottom-comment-box'>
        <div className='board-detail-bottom-comment-container'>
          <div className='board-detail-bottom-comment-title'>{'댓글 '}<span className='emphasis'>{3}</span></div>
          <div className='board-detail-bottom-comment-list-container'>
            {commentList.map(item => <CommentItem commentListItem={item} />)}
          </div>
        </div>
        <div className='divider'></div>
        <div className='board-detail-bottom-comment-pagination-box'>
          <Pagination />
        </div>
        <div className='board-detail-bottom-comment-input-box'>
          <div className='board-detail-bottom-comment-input-container'>
            <textarea className='board-detail-bottom-comment-textarea' placeholder='댓글을 작성해주세요.'/>
            <div className='board-detail-bottom-comment-button-box'>
              <div className='disable-button'>{'댓글달기'}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    )
  }

  //           Render : 게사물 상세 화면 컴포넌트  렌더링       //
  return (
    <div id='board-detail-wrapper'>
      <div className='board-detail-container'>
        <BoardDetailTop />
        <BoardDetailBottom />
      </div>
    </div>
  )
}
