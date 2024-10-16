import React from 'react';
import styled from './userAvatarBuy.module.css';
// import UserAvatar from '../atom/UserAvatar';

const UserAvatarBuy =(props: {
  buyPopup: boolean,
  setBuyPopup:Function
}) => {
  console.log(props, 'dddd')
  return (
    <form className={styled.user_avatarFrm}>
      <div className={styled.user_wear}>
        <label className={styled.user_label} htmlFor='userAvatar'>
          <img src="" alt="현재착용중 아바타" />
        </label>
      </div>
      <div className={styled.btn_area}>
        <button className={styled.btn}>구입</button>
        <span 
          className={styled.btn}
          onClick={() => {props.setBuyPopup(!props.buyPopup)}
        }
        >취소</span>
      </div>
    </form>
  );
}

export default UserAvatarBuy;
