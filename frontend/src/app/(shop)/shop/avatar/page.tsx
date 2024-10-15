import React from 'react'
import Admin from './comoponents/Admin'
import User from './comoponents/User';
import UserAvatarBuy from './comoponents/UserAvatarBuy';
import styled from './page.module.css';

const page = () => {
  return (
    <div className={styled.body_wrap}>
      {/* <Admin /> */}
      {/*  */}
      {/* <UserAvatarBuy/> */}
      <User />
    </div>
  )
}

export default page;
