import React, { useState, KeyboardEvent, useRef } from 'react'
import './style.css'
import InputBox from 'components/InputBox';

//          Component : 인증 화면 컴포넌트          //
export default function Authentication() {

  //          state: 화면 상태 (sign in인지 sign up인지)          //
  const [view, setView] = useState<'sign-in'|'sign-up'>('sign-in');

  //          state: 화면분할 상태 (sign in인지 sign up인지)          //
  const [grid, setGrid] = useState<'left'|'right'>('right');


  //          Component : Sign In card 컴포넌트          //
  const SignInCard = () => {

    //          state: 이메일 요소 참조 상태         //
    const emailRef = useRef<HTMLInputElement | null>(null);

    //          state: password 요소 참조 상태         //
    const passwordRef = useRef<HTMLInputElement | null>(null);

    //          state: 이메일 상태            //
    const [email, setEmail] = useState<string>('');

    //          state: 비밀번호 상태            //
    const [password, setPassword] = useState<string>('');
    
    //          state: 비밀번호 type 상태            //
    const [passwordType, setPasswordType] = useState<'text' | 'password'>('password');

    //          state: error 상태             //
    const [error, setError] = useState<boolean>(false);

    //          state: 비밀번호 버튼 아이콘 상태           //
    const [passwordButtonIcon, setPasswordButtonIcon] = useState<'eye-light-off-icon'|'eye-light-on-icon'>('eye-light-off-icon');

    //          event handler: 로그인 버튼 클릭 이벤트 처리 함수              //
    const onSignInButtonClickHandler = () => {

    }

    //          event handler: 회원가입 링크 클릭 이벤트 처리 함수          //
    const onSignUpLinkClickHandler = () => {
      setView('sign-up');
      setGrid('left');
    }



    //          event handler: 패스워드 버튼 클릭 이벤트 처리 함수              //
    const onPasswordButtonClickHandler = () => {
      if(passwordType === 'text') {
        setPasswordType('password'); 
        setPasswordButtonIcon('eye-light-off-icon');
      }
      else {
        setPasswordType('text');
        setPasswordButtonIcon('eye-light-on-icon');
      }
    }

    //        event handler: 이메일 인풋 키다운 이벤트 처리        //
    const onEmailKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
      if(event.key !== 'Enter') return;
      if(!passwordRef.current) return;
      passwordRef.current.focus();
    }

    //        event handler: password 인풋 키다운 이벤트 처리        //
    const onPasswordKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
      if(event.key !== 'Enter') return;
      onSignInButtonClickHandler();
    }

    //          Render : Sign In card 화면 컴포넌트  렌더링        //
    return (
      <div className={`auth-card ${grid}`}>
        <div className='auth-card-box'>
          <div className='auth-card-top'>
            <div className='auth-card-title-box'>
              <div className='auth-card-title'>{'로그인'}</div>
            </div>
            <InputBox ref={emailRef} label='이메일 주소' type='text' placeholder='이메일 주소를 입력해주세요.' error={error} value={email} setValue={setEmail} onKeyDown={onEmailKeyDownHandler}/>
            <InputBox ref={passwordRef} label='패스워드' type={passwordType} placeholder='비밀번호를 입력해주세요.' error={error} value={password} setValue={setPassword} icon={passwordButtonIcon} onButtonClick={onPasswordButtonClickHandler} onKeyDown={onPasswordKeyDownHandler} />
          </div>
          <div className='auth-card-bottom'>
            {error && 
            <div className='auth-sign-in-error-box'>
              <div className='auth-sign-in-error-message'>
                {'이메일 주소 또는 비밀번호를 잘못 입력했습니다. \n입력하신 내용을 다시 확인해주세요.'}
              </div>
          </div>
          }
            <div className='black-large-full-button' onClick={onSignInButtonClickHandler}>{'로그인'}</div>
            <div className='auth-description-box'>
              <div className='auth-description'>{'신규 사용자이신가요? '}<span className='auth-description-link' onClick={onSignUpLinkClickHandler}>{'회원가입'}</span></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  //          Component : Sign Up card 컴포넌트          //
  const SignUpCard = () => {

    //          event handler: 로그인 링크 클릭 이벤트 처리 함수          //
    const onSignInLinkClickHandler = () => {
      setView('sign-in');
      setGrid('right');
    }

    //          Render : Sign Up card 컴포넌트  렌더링        //
    return (
      <div className={`auth-card ${grid}`}>
        <div className='auth-description'>{'기존 계정이 있으신가요? '}<span className='auth-description-link' onClick={onSignInLinkClickHandler}>{'로그인'}</span></div>
      </div>
    );
  }

    //          Render : 인증 화면 컴포넌트  렌더링        //
  return (
    <div id='auth-wrapper'>
      <div className='auth-container'>
        <div className='auth-jumbotron-box'>
          <div className='auth-jumbotron-contents'>
            <div className='auth-logo-icon'></div>
            <div className='auth-jumbotron-text-box'>
              <div className='auth-jumbotron-text'>{'SEUNG BOARD'}</div>
              <div className='auth-jumbotron-text'>{'로 그 인'}</div>
            </div>
          </div>
        </div>
        <div className='auth-jumbotron-box2'>
          <div className='auth-jumbotron-contents2'>
            <div className='auth-logo-icon'></div>
            <div className='auth-jumbotron-text-box2'>
              <div className='auth-jumbotron-text2'>{'회원가입을 환영합니다'}</div>
              <div className='auth-jumbotron-text2'>{'SEUNG BOARD'}</div>
            </div>
          </div>
        </div>

        {view === 'sign-in' && <SignInCard />}
        {view === 'sign-up' && <SignUpCard />}        
      </div>

    </div>
  )
}