import React from 'react'
import './style.css'
import { FavoriteListItem } from 'types/interface';
const defaultProfileImage = require('assets/image/default_profile_image.jpg');

interface Props {
    favoriteListItem: FavoriteListItem
}

export default function FavoriteItem({favoriteListItem}: Props) {
    //             properties               //
    const {nickname, profileImage} = favoriteListItem;

    //            function: 네비게이트 함수            //
    //const navigator = useNavigate();

    //          event handler: 탑 3 게시물 아이템 클릭 처리 함수            //
    const onClickHandler = () => {
       // navigator(boardNumber);
    }

    //       render :comment List Item 컴포넌트 랜더링       //
  return (
    <div className='favorite-list-item'>
        <div className='favorite-list-item-profile-box'>
            <div className='favorite-list-item-profile-image' style={{backgroundImage: `url(${profileImage ? profileImage : defaultProfileImage})`}}></div>
        </div>
        <div className='favorite-list-item-nickname'>{nickname}</div>
    </div>
  )
}
