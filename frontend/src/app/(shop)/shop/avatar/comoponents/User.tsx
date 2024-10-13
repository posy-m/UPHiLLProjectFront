import React from 'react';
import styled from './user.module.css';
import UserAvatar from '../atom/UserAvatar';

const User = () => {
  return (
    <div className={styled.user_avatar_wrap}>
      <header className={styled.header}>
        {/* <img /> */}
        헤더 영역
      </header>
      <ul className={styled.category}>
        <li>아바타</li>
        <li>상품</li>
      </ul>
      <div className={styled.now_avatar}>
        <UserAvatar />
      </div>
      <div className={styled.avatar_collection}>
        <ul>
           <li>1<div></div></li>
           <li>2</li>
           <li>3</li>
           <li>4</li>
           <li>5</li>
           <li>6</li>
        </ul>
      </div>
    </div>
  )
}

export default User;
