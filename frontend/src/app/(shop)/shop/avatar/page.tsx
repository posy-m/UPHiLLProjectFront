"use client"
import React from 'react'
import Admin from './comoponents/Admin'
import { User } from './comoponents/User';
import { useAtom } from 'jotai';
import { userInfo } from '@/app/(jotai)/atom';

const page = () => {
  const [user] = useAtom(userInfo);
  console.log(user)

  return (
    <>
      {parseInt(user.auth) === 2 ? <Admin /> : <User />}
    </>
  )
}

export default page;