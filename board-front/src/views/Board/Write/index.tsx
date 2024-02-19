import React, { useEffect, useRef, useState } from 'react'
import './style.css'
import { useBoardStore } from 'stores';

//          Component : 게시물 작성 화면 컴포넌트          //
export default function BoardWrite() {

  //          state: textarea 본문 영역 요소 참조 상태            //
  const contentRef = useRef<HTMLTextAreaElement | null>(null);

  //          state: 파일 입력 요소 참조 상태            //
  const imageInputRef = useRef<HTMLInputElement | null>(null);

  //          state: 게시물 상태          //
  const { title, setTitle } = useBoardStore();  
  const { content, setContent } = useBoardStore();
  const { boardImageFileList, setBoardImageFileList } = useBoardStore();
  const { resetBoard } = useBoardStore();


  //          state: 게시물 image 미리보기 URL 상태          //
  const [imageUrls, setImageUrls] = useState<string[]>([]);


  //          effect: 마운트시 실행할 함수          //
  useEffect(() => {
    resetBoard();
  },[]);



  //          Render : 게시물 작성 화면 컴포넌트 렌더링          //
  return (
    <div id='board-write-wrapper'>
      <div className='board-write-container'>
        <div className='board-write-box'>
          <div className='board-write-title-box'>
            <input className='board-write-title-input' type='text' placeholder='제목을 작성해주세요.' value={title}/>
          </div>
          <div className='divider'></div>
          <div className='board-write-content-box'>
            <textarea ref={contentRef} className='board-write-content-textarea' placeholder='본문을 작성해주세요.' value={content}/>
            <div className='icon-button'>
              <div className='icon image-box-light-icon'></div>
            </div>
            <input ref={imageInputRef} type='file' accept='image/*' style={{display: 'none'}}/>
          </div>
          <div className='board-write-images-box'>
            <div className='board-write-image-box'>
              <img className='board-write-image' src='https://flexible.img.hani.co.kr/flexible/normal/875/638/imgdb/resize/2018/1230/00501800_20181230.JPG' />
              <div className='icon-button image-close'>
                <div className='icon close-icon'></div>
              </div>
            </div>

            <div className='board-write-image-box'>
              <img className='board-write-image' src='https://dimg.donga.com/wps/NEWS/IMAGE/2020/11/16/103972000.1.jpg' />
              <div className='icon-button image-close'>
                <div className='icon close-icon'></div>
              </div>
            </div>            
          </div>
        </div>
        
      </div>
    </div>
  )
}
