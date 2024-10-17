"use client"
import React from 'react'
import Admin from './comoponents/Admin'
import { User } from './comoponents/User';
import { useAtom } from 'jotai';
import { userInfo } from '@/app/(jotai)/atom';

const page = () => {
  // const {} = useAtom();
  const auth: string = '일반';


  const [user] = useAtom(userInfo);
  console.log(user)

  // console.log(user)
  // const [authCompare, setAuthCompare] = useAtom<object>({
  //   email: '',
  //   nickName: '',
  //   point: '',
  //   image: ''
  // });
  return (
    <>
      {/* {
          auth === "일반" ? <User /> : <Admin />
        } */}
      {/* <Admin /> */}
      <User />
    </>
  )
}

export default page;