import React from 'react'
import Admin from './comoponents/Admin'
import {User} from './comoponents/User';
import UserAvatarBuy from './comoponents/UserAvatarBuy';
import styled from './page.module.css';

const page = () => {
  const auth:string = '일반'
  
    return (
      <>
        {
          auth === "일반" ? <User /> : <Admin />
        }
      </>
  )
}
 
export default page;