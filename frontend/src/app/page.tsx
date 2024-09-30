'use client'
import React from 'react'
import styles from './(siginin)/login.module.css'
import Header from './_components/header/header';
import Link from 'next/link';
import Footerbar from './_components/footerbar/footerbar';

export default function Home() {

  return (<>
    <Header showBackButton={false} />
    <form className={styles.sign_in} >
      <span>로그인</span>
      <input type="text" placeholder='이메일를 입력해주세요' />
      <input type="password" placeholder='비밀번호를 입력해주세요 ' />
      <button>로그인</button>
      <div className={styles.findBox}>
        <Link href="/findid">이메일 찾기</Link>
        <Link href="/findpassword">비밀번호 찾기</Link>
        <Link href="/signup">회원가입</Link>
      </div>
      <button>카카오 소셜 로그인</button>
    </form>
  </>
  );
}
