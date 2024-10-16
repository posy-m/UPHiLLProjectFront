'use client'

import React, { useEffect, useState } from 'react';
import styled from './user.module.css';
import UserAvatar from '../atom/UserAvatar';
import Header from '@/app/_components/header/header';
import Footerbar from '@/app/_components/footerbar/footerbar';
import {UseUserScroll} from '../../hooks/useScroll';
import Link from 'next/link';
import UserAvatarBuy from './UserAvatarBuy';
const User = () => {
  const [nowAvatar, setNowAvatar] = useState(null);
  const [buyPopup, setBuyPopup] = useState<boolean>(false);
  
  

  return (<>
    <Header showBackButton={false} />
    <div className={styled.user_avatar_wrap}>
      <ul className={styled.product_ul}>
        <li style={{borderBottom:"3px solid rgb(112, 61, 22)", color: "rgb(112, 61, 22)", boxSizing: "border-box"}}><Link href="http://localhost:3000/shop/avatar">아바타</Link></li>
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
    {buyPopup ? <UserAvatarBuy buyPopup={buyPopup} 
      setBuyPopup={setBuyPopup} /> : ""}
    </div>
    <Footerbar />
    </>
  )
}

export default User;