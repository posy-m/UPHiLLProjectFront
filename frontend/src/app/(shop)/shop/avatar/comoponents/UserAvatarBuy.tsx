import React from 'react';
import UserAvatar from '../atom/UserAvatar';
import styled from './userAvatarBuy.module.css';

function UserAvatarBuy() {
  return (
    <form className={styled.user_avatarFrm}>
      <div className={styled.user_wear}>
        <label className={styled.user_label} htmlFor='userAvatar'>
          <UserAvatar />
        </label>
        <input className={styled.user_avatar} type="file" accept="image/*" name="userAvatar" id="userAvatar" />
      </div>
      <div className={styled.btn_area}>
        <button className={styled.btn}>구입</button>
        <span className={styled.btn}>취소</span>
      </div>
    </form>
  );
}

export default UserAvatarBuy;
