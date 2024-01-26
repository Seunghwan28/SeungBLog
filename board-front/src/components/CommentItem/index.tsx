import React from 'react';
import './style.css';
import { CommentListItem } from 'types/interface';
const defaultProfileImage = require('assets/image/default_profile_image.jpg');

interface Props {
    commentListItem: CommentListItem
}


//            component: comment List Item 컴포넌트            //
export default function CommentItem({commentListItem}: Props) {

    //             properties               //
    const {nickname, profileImage, writeDatetime, content} = commentListItem;

    //            function: 네비게이트 함수            //
    //const navigator = useNavigate();

    //          event handler: 탑 3 게시물 아이템 클릭 처리 함수            //
    const onClickHandler = () => {
       // navigator(boardNumber);
    }

    //       render :comment List Item 컴포넌트 랜더링       //
  return (
    <div className='comment-list-item'>
        <div className='comment-list-item-top'>
            <div className='comment-list-item-profile-box'>
                <div className='comment-list-item-profile-image' style={{backgroundImage: `url(${profileImage ? profileImage : defaultProfileImage})`}}></div>
            </div>
            <div className='comment-list-item-nickname'>{nickname}</div>
            <div className='comment-list-item-divider'>{'\|'}</div>
            <div className='comment-list-item-time'>{writeDatetime}</div>
        </div>
        <div className='comment-list-item-main'>
            <div className='comment-list-item-content'>{content}</div>
        </div>
    </div>
   
  )
}
