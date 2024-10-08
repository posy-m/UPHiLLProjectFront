'use client'
import React, { ChangeEvent, useState } from 'react'
import styles from './(siginin)/login.module.css'
import Header from './_components/header/header';
import Link from 'next/link';
import axios from 'axios';
import { useRouter } from "next/navigation";
import { useAtom } from 'jotai';
import { userInfo } from './(jotai)/atom';

export default function Home() {
  const [emailValue, setEmailValue] = useState<string>("");
  const [passwordValue, setPasswordValue] = useState<string>("");
  const router = useRouter()
  const [atom, setAtom] = useAtom(userInfo)

  // 이메일로 로그인
  const loginBtn = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    try {
      const response = await axios.post("http://localhost:3000/user/siginin", {
        emailValue,
        passwordValue
      }, { withCredentials: true })
      setAtom(response.data)
      // 경재가 해놓은 라우터로
      router.push("/")
    } catch (error) {
      console.error("로그인 데이터 에러", error)
    }
  }

  // 소셜 로그인
  const kakaoBtn = async () => {
    const respose = await axios.post("http://localhost:3000/kakao")
    const kakaoData = respose.data
    if (kakaoData) {
      setAtom(kakaoData)
      router.push("/")
    }
  }

  return (<>
    <Header showBackButton={false} />
    <form className={styles.sign_in} onSubmit={loginBtn}>
      <span>로그인</span>
      <input type="text" placeholder='이메일를 입력해주세요' name='email' onChange={(e: ChangeEvent) => { setEmailValue((e.target as HTMLInputElement).value) }} />
      <input type="password" placeholder='비밀번호를 입력해주세요 ' name='password' onChange={(e: ChangeEvent) => { setPasswordValue((e.target as HTMLInputElement).value) }} />
      <button>로그인</button>
      <div className={styles.findBox}>
        <Link href="/findid">이메일 찾기</Link>
        <Link href="/password">비밀번호 찾기</Link>
        <Link href="/signup">회원가입</Link>
      </div>
      <button onClick={kakaoBtn}>카카오 소셜 로그인</button>
    </form>
  </>
  );
}