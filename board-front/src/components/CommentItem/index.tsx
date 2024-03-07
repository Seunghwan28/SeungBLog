import './style.css';
import dayjs from 'dayjs';
import { CommentListItem } from 'types/interface';
const defaultProfileImage = require('assets/image/default_profile_image.jpg');

interface Props {
    commentListItem: CommentListItem
}


//            component: comment List Item 컴포넌트            //
export default function CommentItem({commentListItem}: Props) {

    //             state: properties               //
    const {nickname, profileImage, writeDatetime, content} = commentListItem;

    //             function: 작성일 경과 시간 함수           //
    const getElapsedTime = () => {
        const now = dayjs().add(9, 'hour');
        const writeTime = dayjs(writeDatetime);

        const gap = now.diff(writeTime, 's');
       
        if(gap < 60) return `${gap}초 전`;
        else if(gap < 3600) return `${Math.floor(gap / 60)}분 전`;
        else if(gap < 86400) return `${Math.floor(gap / 3600)}시간 전`;
        else return `${Math.floor(gap / 86400)}일 전`;
    }

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
            <div className='comment-list-item-time'>{getElapsedTime()}</div>
        </div>
        <div className='comment-list-item-main'>
            <div className='comment-list-item-content'>{content}</div>
        </div>
    </div>
   
  )
}
