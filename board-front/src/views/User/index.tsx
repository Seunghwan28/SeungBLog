import React, { ChangeEvent, useEffect, useRef, useState } from 'react'
import './style.css'
import { useNavigate, useParams } from 'react-router-dom';
import usePagination from 'hooks/pagination.hook';
import BoardListItem from 'types/interface/board-list-item.interface';
import BoardItem from 'components/BoardItem';
import Pagination from 'components/Pagination';
import { latestBoardListMock } from 'mocks';
import { BOARD_PATH, BOARD_WRITE_PATH, USER_PATH } from 'constant';
import { useLoginUserStore } from 'stores';
const defaultProfileImage = require('assets/image/default_profile_image.jpg');

//          Component: 유저 화면 컴포넌트         //
export default function User() {

  //          state: userEmail 경로 상태          //
  const {userEmail} = useParams();

  //          state: 마이페이지 여부 상태             //
  const [isMyPage, setMyPage] = useState<boolean>(true);

  //          state: 로그인 유저 상태          //
  const {loginUser} = useLoginUserStore();

  //          function: 네비게이트 함수          //
  const navigate = useNavigate();

  //          Component: 유저 상단 화면 컴포넌트         //
  const UserTop = () => {

    //          state: 이미지 파일 input참조 상태           //
    const imageInputRef = useRef<HTMLInputElement | null>(null);

    //          state: 닉네임 변경여부 상태           //
    const [isChangeNickname, setChangeNickname] = useState<boolean>(false);

    //          state: 닉네임 상태             //
    const [nickname, setNickname] = useState<string>('');

    //          state: 변경닉네임 상태             //
    const [changedNickname, setChangedNickname] = useState<string>('');

    //          state: 프로필이미지  상태             //
    const [profileImage, setProfileImage] = useState<string | null>(null);

    //          event Handler: 프로필 박스 클릭 이벤트 처리             //
    const onProfileBoxClickHandler = () => {
      if(!isMyPage) return;
      if(!imageInputRef.current) return;
      imageInputRef.current.click(); 
    }

    //          event Handler: 닉네임 edit버튼 클릭 이벤트 처리         //
    const onNicknameEditButtonClickHandler = () => {
      setChangedNickname(nickname);
      setChangeNickname(!isChangeNickname);
    } 

    //          event Handler: 프로필 수정 이벤트 처리           //
    const onProfileImageChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
      if(!event.target.files || !event.target.files.length) return;

      const file = event.target.files[0];
      const data = new FormData();
      data.append('file', file);
    }

    //          event Handler: 닉네임 변경 이벤트 처리          //
    const onNicknameChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
      const {value} = event.target;
      setChangedNickname(value);
    }


    //          effect: user email path variable 변경시 실행할 함수            //
    useEffect(() => {
      setNickname('고한영');
      setProfileImage('https://search.pstatic.net/common/?src=http%3A%2F%2Fshop1.phinf.naver.net%2F20240205_154%2F1707104829276Ojsxy_JPEG%2F17267677100724324_883875013.jpg')

    },[userEmail]);


    //          Render: 유저 상단 화면 컴포넌트 렌더링        //
    return(
      <div id='user-top-wrapper'>
        <div className='user-top-container'>
          {isMyPage ?
          <div className='user-top-my-profile-image-box' onClick={onProfileBoxClickHandler}>
            {profileImage !== null ? 
            <div className='user-top-profile-image' style={{backgroundImage: `url(${profileImage})`}}></div> :
              <div className='icon-box-large'>
                <div className='icon image-box-white-icon'></div>
              </div>
            }
            <input ref={imageInputRef} type='file' accept='image/*' style={{display: 'none'}} onChange={onProfileImageChangeHandler}/>
          </div> :
          <div className='user-top-profile-image-box' style={{backgroundImage: `url(${profileImage ? profileImage : defaultProfileImage})`}}></div>
          }
          
          <div className='user-top-info-box'>
            <div className='user-top-info-nickname-box'>
              {isMyPage ? 
              <>
              {isChangeNickname ? 
              <input className='user-top-info-nickname-input' type='text' size={nickname.length + 2} value={changedNickname} onChange={onNicknameChangeHandler}/> :
              <div className='user-top-info-nickname'>{nickname}</div>
              }
              <div className='icon-button' onClick={onNicknameEditButtonClickHandler}>
                <div className='icon edit-icon'></div>
              </div>
              </> :
              <div className='user-top-info-nickname'>{nickname}</div>
              } 
            </div>
            <div className='user-top-info-email'>{userEmail}</div>
          </div>
        </div>
      </div>
    );
  };

  //          Component: 유저 하단 화면 컴포넌트         //
  const UserBottom = () => {

    //          state: 검색 게시물 개수 상태           //
    const [count, setCount] = useState<number>(2);
    
    //          state: 게시물 리스트 상태 (임시)            //
    const [userBoardList, setUserBoardList] = useState<BoardListItem[]>([]);

    //          state: 페이지네이션 관련 상태           //
   const {currentPage, currentSection, viewList, viewPageList, totalSection,
    setCurrentPage,setCurrentSection, setTotalList } = usePagination<BoardListItem>(5);

    //          event Handler: 사이드 카드 클릭 이벤트 처리           //
    const onSideCardClickHandler = () => {
      if(isMyPage) {navigate(BOARD_PATH() + '/' + BOARD_WRITE_PATH());}
      else if(loginUser) {
        navigate(USER_PATH(loginUser.email));
      }
    }

    //          effect: userEmail path variable이 변경될때마다 실행할 함수            //
    useEffect(() => {
      setUserBoardList(latestBoardListMock);
    },[userEmail]);


    //          Render: 유저 하단 화면 컴포넌트 렌더링        /
    return(
      <div id='user-bottom-wrapper'>
        <div className='user-bottom-container'>
            <div className='user-bottom-title'>{isMyPage ? '내 게시물 ' : '게시물 '}<span className='emphasis'>{count}</span></div>
            <div className='user-bottom-contents-box'>
              {count === 0 ? 
              <div className='user-bottom-contents-nothing'>{'게시물이 없습니다.'}</div> :
              <div className='user-bottom-contents'>
                {userBoardList.map(boardListItem => <BoardItem boardListItem={boardListItem} />)}
              </div>
              }
              <div className='user-bottom-side-box'>
                <div className='user-bottom-side-card' onClick={onSideCardClickHandler}>
                  <div className='user-bottom-side-container'>
                    {isMyPage ? 
                    <>
                    <div className='icon-box'>
                      <div className='icon edit-icon'></div>
                    </div>
                    <div className='user-bottom-side-text'>{'글쓰기'}</div>
                    </> :
                    <>
                    <div className='user-bottom-side-text'>{'내 게시물로 가기'}</div>
                    <div className='icon-box'>
                      <div className='icon arrow-right-icon'></div>
                    </div>
                    </> 
                  }
                  </div>
                </div>
              </div>
            </div>
            <div className='user-bottom-pagination-box'></div>
        </div>
      </div>
    );
  };

  //          Render: 유저 화면 컴포넌트 렌더링        //
  return (
    <>
    <UserTop />
    <UserBottom />
    </>
  )
}
