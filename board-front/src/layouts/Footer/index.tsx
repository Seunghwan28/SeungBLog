import React from 'react'
import './style.css'

//          component: 푸터 레이아웃          //
export default function Footer() {

//           event handler: 인스타 아이콘 버튼 클릭 이벤트 처리           //
const onInstaIconButtonClickHandler = () => {
    window.open('https://www.instagram.com');
}

//           event handler: 네이버 블로그 버튼 클릭 이벤트 처리           //
const onNaverBlogIconButtonClickHandler = () => {
    window.open('https://blog.naver.com');
}

//           event handler: 페이스북 버튼 클릭 이벤트 처리           //
const onFacebookIconButtonClickHandler = () => {
    window.open('https://www.facebook.com');
}

//           render: 푸터 레이아웃 랜더링    
  return (
    <div id='footer'>
        <div className='footer-container'>
            <div className='footer-top'>
                <div className='footer-logo-box'>
                    <div className='icon-box'>
                        <div className='icon logo-light-icon'></div>
                    </div>
                    <div className='footer-logo-text'>{'Seungs Board'}</div>
                </div>
                <div className='footer-link-box'>
                    <div className='footer-email-link'>{'shlee5820@hanyang.ac.kr'}</div>
                    <div className='icon-button' onClick={onInstaIconButtonClickHandler}>
                        <div className='icon insta-icon'></div>
                    </div>
                    <div className='icon-button' onClick={onNaverBlogIconButtonClickHandler}>
                        <div className='icon naver-blog-icon'></div>
                    </div>
                    <div className='icon-button' onClick={onFacebookIconButtonClickHandler}>
                        <div className='icon facebook-icon'></div>
                    </div>
                </div>
            </div>
            <div className='footer-bottom'>
                <div className='footer-copyright'>{'Copyright © 2024 Cookie. All Rights Reserved.'}</div>
            </div>
        </div>
    </div>
  )
}
