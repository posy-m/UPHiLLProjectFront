'use client'

import React from 'react';
import styled from './user.module.css';
import UserAvatar from '../atom/UserAvatar';
import Header from '@/app/_components/header/header';
import Footerbar from '@/app/_components/footerbar/footerbar';
import {UseUserScroll} from '../../hooks/UseScroll';
const User = () => {
  return (<>
    <Header showBackButton={false} />
    <div className={styled.user_avatar_wrap}>
      <ul className={styled.category}>
        <li>아바타</li>
        <li>상품</li>
      </ul>
      <div className={styled.now_avatar}>
        <UserAvatar />
      </div>
      <div className={styled.avatar_collection}>
        <UseUserScroll>
           <li className={styled.user_avatar_list}>1</li>
           <li className={styled.user_avatar_list}>1<div className={styled.inactive_avatar}></div></li>
           <li className={styled.user_avatar_list}>1<div className={styled.inactive_avatar}></div></li>
           <li className={styled.user_avatar_list}>1<div className={styled.inactive_avatar}></div></li>
           <li className={styled.user_avatar_list}>1<div className={styled.inactive_avatar}></div></li>
           <li className={styled.user_avatar_list}>1<div className={styled.inactive_avatar}></div></li>
           <li className={styled.user_avatar_list}>1<div className={styled.inactive_avatar}></div></li>
           <li className={styled.user_avatar_list}></li>
           <li className={styled.user_avatar_list}>1<div className={styled.inactive_avatar}></div></li>
           <li className={styled.user_avatar_list}>1<div className={styled.inactive_avatar}></div></li>
           <li className={styled.user_avatar_list}>1<div className={styled.inactive_avatar}></div></li>
           <li className={styled.user_avatar_list}>1<div className={styled.inactive_avatar}></div></li>
           <li className={styled.user_avatar_list}>1<div className={styled.inactive_avatar}></div></li>
           <li className={styled.user_avatar_list}>1<div className={styled.inactive_avatar}></div></li>
           <li className={styled.user_avatar_list}>1<div className={styled.inactive_avatar}></div></li>
           <li className={styled.user_avatar_list}>1<div className={styled.inactive_avatar}></div></li>
           <li className={styled.user_avatar_list}>1<div className={styled.inactive_avatar}></div></li>
           <li className={styled.user_avatar_list}>1<div className={styled.inactive_avatar}></div></li>
        </UseUserScroll>
      </div>
    </div>
    <Footerbar />
    </>
  )
}

export default User;