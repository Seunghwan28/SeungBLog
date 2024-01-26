import {ChangeEvent, useEffect, useRef, useState, KeyboardEvent} from 'react'
import './style.css'
import { useNavigate, useParams } from 'react-router-dom'
import { AUTH_PATH, MAIN_PATH, SEARCH_PATH, USER_PATH } from 'constant'
import { useCookies } from 'react-cookie'
import { useLoginUserStore } from 'stores'

//          Component: 헤더 레이아웃          //
export default function Header() {
  
  //           state: 로그인 유저 상태            //
  const {loginUser, setLoginUser, resetLoginUser} = useLoginUserStore();

  //           state: cookie 상태                //
  const [cookies, setCookie] = useCookies();

  //           state: 로그인 상태                //
  const [isLogin, setLogin] = useState<boolean>(false);



//                function: 네비게이트 함수            //
const navigate = useNavigate();


//             event Handler: 로고 클릭 이벤트 처리 함수            //
const onLogoClickHandler = () => {
  navigate(MAIN_PATH());
}

//           component: 검색 버튼 컴포넌트              //
const SearchButton = () => {

  //              state: 검색 버튼 요소 참조 상태               //
  const searchButtonRef = useRef<HTMLDivElement | null>(null);

  //              state: 검색 버튼 상태               //
  const [status, setStatus] = useState<boolean>(false);

  //              state: 검색어 상태               //
  const [word, setWord] = useState<string>('');

  //              state: 검색어 path variable 상태               //
  const { searchWord } = useParams();

  //         event Handler: 검색어 변경 이벤트 처리 함수             //
  const onSearchWordChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setWord(value);
  }

  //         event Handler: 검색어 키처리 이벤트 처리 함수             //
  const onSearchWordKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    if(event.key !=='Enter') return;
    if(!searchButtonRef.current) return;
    searchButtonRef.current.click();
  };


  //         event Handler: 검색 아이콘 클릭 이벤트 처리 함수             //
  const onSearchButtonClickHandler = () => {
    if(!status) {
      setStatus(!status);
      return;
    }
    navigate(SEARCH_PATH(word));
  }

  //         effect: 검색어 path variable이 변경될 때마다 실행될 함수             //
  useEffect(() => {
    if (searchWord) { 
      setWord(searchWord);
      setStatus(true);
    }
  }, [searchWord]);

  if (!status)
  //              render:  검색 버튼 컴포넌트 랜더링 (클릭 false 상태)                //
  return <div className='icon-button' onClick={onSearchButtonClickHandler}>
    <div className='icon search-light-icon'></div>
  </div>;
  //              render:  검색 버튼 컴포넌트 랜더링 (클릭 true 상태)                //
  return (
      <div className='header-seacrch-input-box'>
        <input className='header-search-input' type='text' placeholder='검색어를 입력해주세요.' value={word}  onChange={onSearchWordChangeHandler} onKeyDown={onSearchWordKeyDownHandler}/>
        <div ref={searchButtonRef} className='icon-button' onClick={onSearchButtonClickHandler}>
          <div className='icon search-light-icon'></div>
        </div>
      </div>
    );
}
  //          Component: 로그인 또는 마이페이지 버튼 레이아웃          //
  const MyPageButton = () => {

    //               state: userEmail path variable 상태            //
    const {userEmail} = useParams();

    //          event Handler: 마이페이지 버튼 클릭 처리 함수              //
    const onMyPageButtonClickHandler = () => {
      if(!loginUser) return;
      const {email} = loginUser;
      navigate(USER_PATH(email));
    }

    //          event Handler: 마이페이지 버튼 클릭 처리 함수              //
    const onSignInButtonClickHandler = () => {
      navigate(AUTH_PATH());
    } 

    //          event Handler: 로그아웃 버튼 클릭 처리 함수              //
    const onSignOutButtonClickHandler = () => {
      resetLoginUser();
      navigate(MAIN_PATH());
    } 

  //          render : 로그아웃 버튼 컴포넌트 랜더링          //
  if(isLogin && userEmail === loginUser?.email)
  return <div className='white-button' onClick={onSignOutButtonClickHandler}>{'로그아웃'}</div>;

  if(isLogin)
  //          render : 마이페이지 버튼 컴포넌트 랜더링          //
  return <div className='white-button' onClick={onMyPageButtonClickHandler}>{'마이페이지'}</div>;
   
  //          render : 로그인 버튼 컴포넌트 랜더링          //
  return <div className='black-button' onClick={onSignInButtonClickHandler}>{'로그인'}</div>;
    
  }

   //          render : 헤더 레이아웃 렌더링         //
  return (
    <div id='header'>
      <div className='header-container'>
        <div className='header-left-box' onClick={onLogoClickHandler}>
          <div className='icon-box'>
            <div className='icon logo-light-icon'></div>
          </div>
          <div className='header-logo'>{'Seungs Board'}</div>
        </div>
        <div className='header-right-box'>
          <SearchButton />
          <MyPageButton />
        </div>
      </div>
    </div>
  )
}
