import React, { useState, KeyboardEvent, useRef, ChangeEvent } from 'react'
import './style.css'
import InputBox from 'components/InputBox';
import { SignInRequestDto } from 'apis/request/auth';
import { signInRequest } from 'apis';
import { SignInResponseDto } from 'apis/response/auth';
import { ResponseDto } from 'apis/response';
import { useCookies } from 'react-cookie';
import { MAIN_PATH } from 'constant';
import { useNavigate } from 'react-router-dom';

//          Component : 인증 화면 컴포넌트          //
export default function Authentication() {

  //          state: 화면 상태 (sign in인지 sign up인지)          //
  const [view, setView] = useState<'sign-in'|'sign-up'>('sign-in');

  //          state: 화면분할 상태 (sign in인지 sign up인지)          //
  const [grid, setGrid] = useState<'left'|'right'>('right');

  //          state: 쿠키 상태                //
  const [cookies, setCookie] = useCookies();


  //         function: 네이게이트 함수          //
  const navigator = useNavigate();


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

    //               function: sign in response 처리 함수               //
    const signInResponse = (responseBody: SignInResponseDto | ResponseDto | null) => {
      if(!responseBody) { //null인경우, 백엔드가 안켜졌을 때
        alert('네트워크 상태를 확인해주세요.');
        return;
      }
      const {code} = responseBody;
      if(code === 'DBE') alert('데이터베이스 오류입니다.');
      if(code === 'SF' || code === 'VF') setError(true);
      if(code !== 'SU') return;

      const {token, expirationTime} = responseBody as SignInResponseDto;
      const now = new Date().getTime();
      const expires = new Date();
      expires.setTime(now + expirationTime * 1000);


      setCookie('accessToken', token, { expires, path: MAIN_PATH()});
  
      navigator(MAIN_PATH());
    }

    //          event Handler: 이메일 변경 이벤트 처리          //
    const onEmailChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
      setError(false);
      const {value} = event.target;
      setEmail(value);
    }

    //          event Handler: 비밀번호 변경 이벤트 처리          //
    const onPasswordChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
      setError(false);
      const {value} = event.target;
      setPassword(value);
    }
    
    
    
    //          event handler: 로그인 버튼 클릭 이벤트 처리 함수              //
    const onSignInButtonClickHandler = () => {
      const requestBody: SignInRequestDto = { email, password  };
      signInRequest(requestBody).then(signInResponse);
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
            <InputBox ref={emailRef} label='이메일 주소' type='text' placeholder='이메일 주소를 입력해주세요.' error={error} value={email} onChange={onEmailChangeHandler} onKeyDown={onEmailKeyDownHandler}/>
            <InputBox ref={passwordRef} label='패스워드' type={passwordType} placeholder='비밀번호를 입력해주세요.' error={error} value={password} onChange={onPasswordChangeHandler} icon={passwordButtonIcon} onButtonClick={onPasswordButtonClickHandler} onKeyDown={onPasswordKeyDownHandler} />
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

    //          state: 이메일 참조 상태           //
    const emailRef = useRef<HTMLInputElement | null>(null);

    //          state: password 참조 상태           //
    const passwordRef = useRef<HTMLInputElement | null>(null);
    
    //          state: password check 참조 상태           //
    const passwordCheckRef = useRef<HTMLInputElement | null>(null);

    //          state: nickname 참조 상태           //
    const nicknameRef = useRef<HTMLInputElement | null>(null);

    //          state: 핸드폰 번호 참조 상태           //
    const telNumberRef = useRef<HTMLInputElement | null>(null);

    //          state: address 참조 상태           //
    const addressRef = useRef<HTMLInputElement | null>(null);

    //          state: 상세 주소 참조 상태           //
    const addressDetailRef = useRef<HTMLInputElement | null>(null);



    //          state: 페이지 번호 상태           //
    const [page, setPage] = useState<1 | 2>(1);


    //          state: 이메일 상태            //
    const [email, setEmail] = useState<string>('');

    //          state: ps 상태            //
    const [password, setPassword] = useState<string>('');

    //          state: ps 확인 상태            //
    const [passwordCheck, setPasswordCheck] = useState<string>('');

    //          state: 닉네임 상태            //
    const [nickname, setNickname] = useState<string>('');

    //          state: 핸드폰 번호 상태            //
    const [telNumber, setTelNumber] = useState<string>('');

    //          state: 주소 상태            //
    const [address, setAddress] = useState<string>('');

    //          state: 상세 주소 상태            //
    const [addressDetail, setAddressDetail] = useState<string>('');



    //          state: password 타입 상태            //
    const [passwordType, setPasswordType] = useState<'text' | 'password'>('password');

    //          state: password check 타입 상태         //
    const [passwordCheckType, setPasswordCheckType] = useState<'text' | 'password'>('password');


    //          state: 이메일 에러 상태           //
    const [isEmailError, setEmailError] = useState<boolean>(false);

    //          state: 패스워드 에러 상태           //
    const [isPasswordError, setPasswordError] = useState<boolean>(false);

    //          state: 패스워드 확인 에러 상태           //
    const [isPasswordCheckError, setPasswordCheckError] = useState<boolean>(false);

    //          state: 닉네임 에러 상태           //
    const [isNickNameError, setNickNameError] = useState<boolean>(false);

    //          state: 핸드폰번호 에러 상태           //
    const [isTelNumberError, setTelNumberError] = useState<boolean>(false);

    //          state: 주소 에러 상태           //
    const [isAddressError, setAddressError] = useState<boolean>(false);



    //          state: 이메일 에러 메세지 상태            //
    const [emailErrorMessage, setEmailErrorMessage] = useState<string>('');

    //          state: 패스워드 에러 메세지 상태            //
    const [passwordErrorMessage, setPasswordErrorMessage] = useState<string>('');

    //          state: 패스워드 확인 에러 메세지 상태            //
    const [passwordCheckErrorMessage, setPasswordCheckErrorMessage] = useState<string>('');

    //          state: 닉네임 에러 메세지 상태            //
    const [nicknameErrorMessage, setNicknameErrorMessage] = useState<string>('');

    //          state: 핸드폰번호 에러 메세지 상태            //
    const [telNumberErrorMessage, setTelNumberErrorMessage] = useState<string>('');

    //          state: 주소 에러 메세지 상태            //
    const [addressErrorMessage, setAddressErrorMessage] = useState<string>('');




    //          state: 패스워드 버튼 아이콘 상태             //
    const [passwordButtonIcon, setPasswordButtonIcon] = useState<'eye-light-off-icon'|'eye-light-on-icon'>('eye-light-off-icon');

    //          state: 패스워드 확인 버튼 아이콘 상태             //
    const [passwordCheckButtonIcon, setPasswordCheckButtonIcon] = useState<'eye-light-off-icon'|'eye-light-on-icon'>('eye-light-off-icon');

    //          event Handler: 이메일 변경 이벤트 처리          //
    const onEmailChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
      const {value} = event.target;
      setEmail(value);
    }

    //          event Handler: 패스워드 변경 이벤트 처리           //
    const onPasswordChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
      const {value} = event.target;
      setPassword(value);
    }

    //          event Handler: 패스워드 확인 변경 확인 이벤트 처리           //
    const onPasswordCheckChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
      const {value} = event.target;
      setPasswordCheck(value);
    }
    //          event Handler: 닉네임 변경 확인 이벤트 처리           //
    const onNicknameChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
      const {value} = event.target;
      setNickname(value);
    }
    //          event Handler: 핸드폰 번호 변경 확인 이벤트 처리           //
    const onTelNumberChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
      const {value} = event.target;
      setTelNumber(value);
    }
    //          event Handler: 주소 변경 확인 이벤트 처리           //
    const onAddressChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
      const {value} = event.target;
      setAddress(value);
    }
    //          event Handler: 상세주소 변경 확인 이벤트 처리           //
    const onAddressDetailChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
      const {value} = event.target;
      setAddressDetail(value);
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

    //          event handler: 패스워드 확인 버튼 클릭 이벤트 처리 함수              //
    const onPasswordCheckButtonClickHandler = () => {
      if(passwordCheckType === 'text') {
        setPasswordCheckType('password'); 
        setPasswordCheckButtonIcon('eye-light-off-icon');
      }
      else {
        setPasswordCheckType('text');
        setPasswordCheckButtonIcon('eye-light-on-icon');
      }
    }

    //          event handler: 다음 단계 버튼 클릭 이벤트 처리 함수              //
    const onNextButtonClickHandler = () => {
      const emailPattern = /^[a-zA-Z0-9]*@([-.]?[a-zA-Z0-9])*\.[a-zA-Z]{2,4}$/;
      const isEmailPattern = emailPattern.test(email);

      if(!isEmailPattern) {
        setEmailError(true);
        setEmailErrorMessage('이메일 주소 포맷이 맞지 않습니다.');
      }
      const isCheckedPassword = password.trim().length > 8;
      if(!isCheckedPassword) {
        setPasswordError(true);
        setPasswordErrorMessage('비밀번호는 8자 이상 입력해주세요.');
      }

      const isEqualPassword = password === passwordCheck;
      if(!isEqualPassword) {
        setPasswordCheckError(true);
        setPasswordCheckErrorMessage('비밀번호가 일치하지 않습니다.');
      }
      if(!isEmailPattern || !isCheckedPassword || !isEqualPassword) return;

      setPage(2);
    }

    //        event Handler: 회원가입 버튼 클릭 이벤트 처리         //
    const onSignUpButtonClickHandler = () => {

    }

    //        event Handler: 주소 버튼 클릭 이벤트 처리          //
    const onAddressButtonClickHandler = () => {

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
      if(!passwordCheckRef.current) return;
      passwordCheckRef.current.focus();
    }

    //        event handler: password 확인 인풋 키다운 이벤트 처리        //
    const onPasswordCheckKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
      if(event.key !== 'Enter') return;
      onNextButtonClickHandler();
    }

    //        event handler: 닉네임 인풋 키다운 이벤트 처리        //
    const onNicknameKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
      if(event.key !== 'Enter') return;
      if(!telNumberRef.current) return;
      telNumberRef.current.focus();
    }

    //        event handler: 핸드폰 번호 인풋 키다운 이벤트 처리        //
    const onTelNumberKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
      if(event.key !== 'Enter') return;
      if(!addressRef.current) return;
      addressRef.current.focus();
    }

    //        event handler: 주소 인풋 키다운 이벤트 처리        //
    const onAddressKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
      if(event.key !== 'Enter') return;
      if(!addressDetailRef.current) return;
      addressDetailRef.current.focus();
    }

    //        event handler: 상세주소 인풋 키다운 이벤트 처리        //
    const onAddressDetailKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
      if(event.key !== 'Enter') return;
      onSignUpButtonClickHandler();
    }


    



    //          event handler: 로그인 링크 클릭 이벤트 처리 함수          //
    const onSignInLinkClickHandler = () => {
      setView('sign-in');
      setGrid('right');
    }

    //          Render : Sign Up card 컴포넌트  렌더링        //
    return (
      <div className={`auth-card ${grid}`}>
        <div className='auth-card-box'>
          <div className='auth-card-top'>
            <div className='auth-card-title-box'>
              <div className='auth-card-title'>{'회원가입'}</div>
              <div className='auth-card-page'>{`${page} / 2`}</div>
            </div>
            {page === 1 && (
              <>
              <InputBox ref={emailRef} label='이메일 주소 *' type='text' placeholder='이메일 주소를 입력해주세요.' value={email} onChange={onEmailChangeHandler} error={isEmailError} message={emailErrorMessage} onKeyDown={onEmailKeyDownHandler}/>
              <InputBox ref={passwordRef} label='비밀번호 *' type={passwordType} placeholder='비밀번호를 입력해주세요.' value={password} onChange={onPasswordChangeHandler} error={isPasswordError} message={passwordErrorMessage} icon={passwordButtonIcon} onButtonClick={onPasswordButtonClickHandler} onKeyDown={onPasswordKeyDownHandler}/>
              <InputBox ref={passwordCheckRef} label='비밀번호 확인 *' type = {passwordCheckType} placeholder='비밀번호를 다시 입력해주세요.' value={passwordCheck} onChange={onPasswordCheckChangeHandler} error={isPasswordCheckError} message={passwordCheckErrorMessage} icon={passwordCheckButtonIcon} onButtonClick={onPasswordCheckButtonClickHandler} onKeyDown={onNextButtonClickHandler}/>
              </>
            )}
            {page === 2 && (
              <>
              <InputBox ref={nicknameRef} label='닉네임 *' type='text' placeholder='닉네임을 입력해주세요.' value={nickname} onChange={onNicknameChangeHandler} error={isNickNameError} message={nicknameErrorMessage} onKeyDown={onNicknameKeyDownHandler}/>
              <InputBox ref={telNumberRef} label='핸드폰 번호 *' type='text' placeholder='핸드폰 번호를 입력해주세요.' value={telNumber} onChange={onTelNumberChangeHandler} error={isTelNumberError} message={telNumberErrorMessage} onKeyDown={onTelNumberKeyDownHandler}/>
              <InputBox ref={addressRef} label='주소 *' type='text' placeholder='우편번호 찾기' value={address} onChange={onAddressChangeHandler} error={isAddressError} message={addressErrorMessage} onKeyDown={onAddressKeyDownHandler} icon='expand-right-light-icon' onButtonClick={onAddressButtonClickHandler}/>
              <InputBox ref={addressDetailRef} label='상세 주소' type='text' placeholder='상세 주소를 입력해주세요.' value={addressDetail} onChange={onAddressDetailChangeHandler} error={false} onKeyDown={onAddressDetailKeyDownHandler}/>
              
              </>
            )}
          </div>
          <div className='auth-card-bottom'>
            {page === 1 && (
              <div className='black-large-full-button' onClick={onNextButtonClickHandler}>{'다음 단계'}</div>
            )}
            {page === 2 && (
              <>
              <div className='auth-consent-box'>
                <div className='auth-check-box'>
                  <div className='check-ring-light-icon'></div>
                </div>
                <div className='auth-consent-title'>{'개인정보동의'}</div>
                <div className='auth-consent-link'>{'더보기 >'}</div>
              </div>
              <div className='black-large-full-button' onClick={onSignUpButtonClickHandler}>{'회원가입'}</div>
              </>
            )}
            <div className='auth-description'>{'이미 계정이 있으신가요? '}<span className='auth-description-link' onClick={onSignInLinkClickHandler}>{'로그인'}</span></div>
          </div> 
        </div>
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