"use client"
import React from 'react'
import Admin from './comoponents/Admin'
import User from './comoponents/User'
import { useAtom } from 'jotai'
import { userInfo } from '@/app/(jotai)/atom'

const page = () => {
  // const {} = useAtom();
  const auth: string = '일반'
  const [user] = useAtom(userInfo);
  const checkEmail = async () => {
    if (user.email === '') {

    }
  }



  console.log('test')
  return (
    <>
      {user.auth === "관리자" ? <Admin /> : <User />}
      {/* {parseInt(user.auth) === 2 ? <User /> : <Admin />} */}
    </>
  )
}

export default page
