'use client'
import React, { ChangeEvent, useState } from 'react'
import styles from './(login)/login.module.css'
import Header from './_components/header/header';
import Link from 'next/link';
import axios from 'axios';
import { useRouter } from "next/navigation";
import { useAtom } from 'jotai';
import { userInfo } from './(jotai)/atom';
import customAxios from '@/lib/customAxios';
import { Valiation } from './signup/valiation';


export default function Home() {
  const [emailValue, setEmailValue] = useState<string>("");
  const [passwordValue, setPasswordValue] = useState<string>("");
  const router = useRouter()
  const [atom, setAtom] = useAtom(userInfo)
  const [errorMessage, setErrorMessage] = useState<boolean | null>(null)

  // 이메일로 로그인
  const loginBtn = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    try {

      const { data } = await customAxios.post(`/user/signin`, {
        email: emailValue,
        password: passwordValue
      },)
      setAtom(data)
      console.log(data)

      // 경재가 해놓은 라우터로
      router.push("/main")
    } catch (error) {
      setErrorMessage(false)
      console.error("로그인 데이터 에러", error)
    }
  }

  // 소셜 로그인
  const kakaoBtn = async () => {
    router.push("https://uphillmountain.store/back/user/kakao");
    // 경재가 해놓은 라우터로
    //const respose = await customAxios.get('/user/kakao')
    // const kakaoData = respose.data
    // if (kakaoData) {
    //   setAtom(kakaoData)
    //   router.push("/main")
    // }
  }

  return (<>
    <Header showBackButton={false} />
    <form className={styles.sign_in} onSubmit={loginBtn}>
      <span>로그인</span>
      <input type="text" placeholder='이메일를 입력해주세요' name='email' onChange={(e: ChangeEvent) => { setEmailValue((e.target as HTMLInputElement).value) }} />
      <div>
        <input type="password" placeholder='비밀번호를 입력해주세요 ' name='password' onChange={(e: ChangeEvent) => { setPasswordValue((e.target as HTMLInputElement).value) }} />
        {errorMessage !== null && <p className={styles.error}>{errorMessage ? "" : "이메일 또는 비밀번호가 일치하지 않습니다."}</p>}
      </div>
      <button>로그인</button>
      <div className={styles.findBox}>
        <Link href="/id">이메일 찾기</Link>
        <Link href="/password">비밀번호 찾기</Link>
        <Link href="/signup">회원가입</Link>
      </div>
      <button type='button' onClick={kakaoBtn}>카카오 로그인</button>
    </form>
  </>
  );
}
