'use client'
import React,{useEffect, useState} from 'react'
import MypageInfoheader from './MypageInfoheader'
import MypsgeText from './MypsgeText'
import ChangePlace from './ChangePlace'
import FooterMemWith from './FooterMemWith'
import PurchaseInfo from './PurchaseInfo'
import Confichange from './Confichange'
import styled from './style.module.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient();
const InfoForm = () => {

  const [select,setSelect] = useState('개인정보')
  const [userInfo,setUserInfo] = useState({
    email:'lkj26902465@gmail.com',
    points:1004,
    nickname:'이코노미님',
    password: 'lkj123'
  })

  const [temNinck,setTemNinck] = useState(userInfo.nickname)
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [nicknameMessage, setNicknameMessage] = useState('');
  const [passwordMessage, setPasswordMessage] = useState('');
  const [isPasswordChangeMode, setIsPasswordChangeMode] = useState(false); // 비밀번호 변경 모드 상태


  // useEffect(() => {
  //   // API 요청 가정
  //   const fetchUserInfo = async () => {
  //     const response = await fetch('/api/user'); // 백엔드 API 호출
  //     const data = await response.json();
  //     setUserInfo({
  //       email: data.email,
  //       points: data.points,
  //       nickname: data.nickname,
  //     });
  //   };

  //   fetchUserInfo();
  // }, []);


  // 닉네임 변경 함수
  const nicknameChange = async () => {
    // const response = await fetch('/api/user/nickname', {
    //   method: 'POST',
    //   body: JSON.stringify({ nickname: newNickname }),
    //   headers: { 'Content-Type': 'application/json' },
    // });
    // const result = await response.json();
    // if (result.success) {
    //   setUserInfo((prev) => ({ ...prev, nickname: newNickname }));
    // }

    if (temNinck === userInfo.nickname) {
      setNicknameMessage('기존 닉네임과 동일합니다.');
      return;
    }
    if (temNinck.length === 0) {
      setNicknameMessage('닉네임을 입력하세요.');
      return
    }

    // 더미데이터를 이용함
    setUserInfo((prev)=>({...prev,nickname:temNinck}))
    setNicknameMessage('닉네임이 변경되었습니다.');
    console.log("닉넴 변경됬으" , temNinck);
  };


  // 비밀번호 변경 
  const passwordChange = () => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,20}$/;

     // 비밀번호 정규식 체크
  if (!passwordRegex.test(newPassword)) {
    setPasswordMessage('비밀번호는 8-20자 이내로, 문자, 숫자, 특수문자를 포함해야 합니다.');
    return;
  }

    if (newPassword !== confirmPassword) {
      setPasswordMessage('비밀번호가 일치하지 않습니다.');
      return
    }
    if (newPassword.length === 0 || confirmPassword.length === 0) {
      setPasswordMessage('새 비밀번호를 입력하세요.');
      return;
    }
    // 더미데이터를 이용함
    setUserInfo((prev) => ({ ...prev, password: newPassword }))
    setPasswordMessage('비밀번호가 변경되었습니다.');
  }


  return (
    <div className=''>
        {/* 개인정보 */}
        <MypageInfoheader select={select} setSelect={setSelect} />
        {select === '개인정보' ? (

      <>
        <MypsgeText email={userInfo.email} points={userInfo.points} onClick={()=>{}}/>

        <ChangePlace 
        name='nickname' 
        className='' 
        inputholder='닉네임' 
        inputype='text' 
        value={temNinck}
        onChange={(value:any)=>setTemNinck(value)}
        />
        <Confichange 
        className='닉네임 변경' 
        title='닉네임 변경' 
        onClick={nicknameChange}
        />
        {nicknameMessage && <p>{nicknameMessage}</p>} {/* 닉네임 관련 메시지 출력 */}
        
         {/* 비밀번호 변경 */}
          {!isPasswordChangeMode ? (
            <>
              {/* 기존 비밀번호 표시 */}
              <ChangePlace
                name='currentPassword'
                className=''
                inputholder='새 비밀번호'
                inputype='text'
                value={userInfo.password}
                onChange=''
              />
              <Confichange
                className='비밀번호 변경'
                title='비밀번호 변경'
                onClick={() => setIsPasswordChangeMode(true)} // 클릭 시 변경 모드로 전환
              />
            </>
          ) : (
            <>
              <ChangePlace
                name='newPassword'
                className=''
                inputholder='새 비밀번호'
                inputype='password'
                value={newPassword}
                onChange={(value: any) => setNewPassword(value)}
              />
              <ChangePlace
                name='confirmPassword'
                className=''
                inputholder='새 비밀번호 확인'
                inputype='password'
                value={confirmPassword}
                onChange={(value: any) => setConfirmPassword(value)}
              />
              <Confichange
                className='비밀번호 변경'
                title='비밀번호 변경'
                onClick={passwordChange}
              />
              {passwordMessage && <p>{passwordMessage}</p>} {/* 비밀번호 관련 메시지 출력 */}
            </>
          )}
        <FooterMemWith onClick=''/>
      </>

        ):(

      // 구매정보
      <>
      <QueryClientProvider client={queryClient}>
        <PurchaseInfo/>
        </QueryClientProvider>
      </>
        )}

    </div>
  )
}

export default InfoForm
    
