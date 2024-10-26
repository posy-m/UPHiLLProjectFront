'use client'
import React, { useEffect, useState } from 'react'
import MypageInfoheader from './MypageInfoheader'
import MypsgeText from './MypsgeText'
import ChangePlace from './ChangePlace'
import FooterMemWith from './FooterMemWith'
import PurchaseInfo from './PurchaseInfo'
import Confichange from './Confichange'
import styled from './style.module.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Footerbar from '@/app/_components/footerbar/footerbar'
import Header from '@/app/_components/header/header'
import customAxios from '@/lib/customAxios'
import { userInfo } from "@/app/(jotai)/atom";
import { useAtom, useAtomValue } from 'jotai'
import getUserInfo from '@/lib/getUserInfo'


const queryClient = new QueryClient();
interface IUser {
  email: string,
  point: number,
  image: string,
  auth: string,
  nickName: string
}
const InfoForm = () => {
  // const [userInfo, setUserInfo] = useState({
  //   email: '',
  //   points: 0,
  //   nickname: '',
  //   password: ''
  // })

  const [select, setSelect] = useState('개인정보')
  const [user, setUser] = useAtom(userInfo);

  const [currentPassword, setCurrentPassword] = useState(''); // 현재 비밀번호 상태 추가
  const [temNinck, setTemNinck] = useState('')
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [nicknameMessage, setNicknameMessage] = useState('');
  const [passwordMessage, setPasswordMessage] = useState('');
  const [isPasswordChangeMode, setIsPasswordChangeMode] = useState(false); // 비밀번호 변경 모드 상태


  useEffect(() => {
    const fetchUserInfo = async () => {
      const info = await getUserInfo();
      setUser(info); // 유저 정보를 아톰에 저장
    };

    fetchUserInfo();
  }, [])

  // 사용자 정보가 업데이트될 때마다 닉네임 초기화
  useEffect(() => {
    if (user.nickName) {
      setTemNinck(user.nickName);
    }
  }, [user]);

  // 사용자 정보 가져오기
  // useEffect(() => {

  //   initNickName();
  // const fetchUserInfo = async () => {
  //   try {
  //     const response = await customAxios.post("/user/userinfo");

  //     setUserInfo(response.data);
  //     setTemNinck(response.data.nickname); // 닉네임 초기화
  //   } catch (error) {
  //     console.error("사용자 정보를 가져오는 중 오류 발생:", error);
  //   }
  // };
  // fetchUserInfo();
  //     }, []);

  // const initNickName = () => {
  //   setTemNinck(user.nickName);
  // }


  // 닉네임 변경 함수
  const nicknameChange = async () => {
    if (temNinck === user.nickName) {
      setNicknameMessage('기존 닉네임과 동일합니다.');
      return;
    }
    if (temNinck.length === 0) {
      setNicknameMessage('닉네임을 입력하세요.');
      return
    }
    if (temNinck.length > 5) {
      setNicknameMessage('닉네임은 5글자 이하로 설정해 주세요.');
      return;
    }
    try {
      console.log("111")
      const updateresponse = await customAxios.post("/user/duplication", {
        type: 'nickName',
        data: temNinck
      });
      console.log(updateresponse, 11111)

    } catch (error) {
      console.log(error)
      alert("이미 존재하는 닉네임입니다.")
      return;
    }

    try {
      const response = await customAxios.put("/user/nickName", {
        nickName: temNinck
      })
      if (response.status === 200) {
        setUser({ ...user, nickName: temNinck });
        setNicknameMessage('닉네임이 변경되었습니다.');
      }
    } catch (error) {
      console.error("닉네임 변경 중 오류 발생:", error);
      setNicknameMessage('닉네임 변경에 실패했습니다.');
    }
  };

  // 비밀번호 변경 
  const passwordChange = async () => {
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

    try {
      const response = await customAxios.put("/user/findpassword", {
        type: 'password',
        data: newPassword
      });
      console.log(response.status);
      if (response.status === 200) {

        setUser((prevUser) => ({ ...prevUser, password: newPassword }));
        setPasswordMessage('비밀번호가 변경되었습니다.');
      }
    } catch (error) {
      console.error("비밀번호 변경 중 오류 발생:", error);
      setPasswordMessage('비밀번호 변경에 실패했습니다.');
    }
  };

  // 사용자 정보 가져오기
  useEffect(() => {
    const getUserInfoPass = async () => {
      try {
        const response = await customAxios.post("/user/userinfo");
        if (response.status === 200) {
          setUser(response.data); // user 상태 업데이트
        }
      } catch (error) {
        console.error(error);
      }
    };

    getUserInfoPass();
  }, []);

  return (<>
    <Header showBackButton={false} /> {/* 뒤로가기 버튼 숨기기 */}
    <div className={styled.container}>
      <div className={styled.centerContent} >
        {/* 개인정보 */}
        <MypageInfoheader select={select} setSelect={setSelect} />
        {select === '개인정보' ? (

          <>
            <MypsgeText user={user} />

            <ChangePlace
              name='nickname'
              inputholder='닉네임'
              inputype='text'
              value={user.nickName}
              onChange={(value: any) => setTemNinck(value)}
            />
            <Confichange
              className='닉네임 변경'
              title='닉네임 변경'
              onClick={nicknameChange}
            />
            {nicknameMessage && <p className={styled.nickMessageP}>{nicknameMessage}</p>} {/* 닉네임 관련 메시지 출력 */}

            {/* 비밀번호 변경 */}
            {!isPasswordChangeMode ? (
              <>
                {/* 기존 비밀번호 표시 */}
                {/* <ChangePlace
                  name='currentPassword'
                  inputholder='현재 비밀번호'
                  inputype='text'
                  value={user.password}
                  onChange={(value: any) => setCurrentPassword(value)} // 입력한 값을 상태로 관리
                /> */}
                <Confichange
                  className='비밀번호 변경'
                  title='비밀번호 변경'
                  onClick={() => setIsPasswordChangeMode(true)} // 클릭 시 변경 모드로 전환
                />
              </>
            ) : (
              <>
                <div className='p-2'>
                  <ChangePlace
                    name='newPassword'
                    inputholder='새 비밀번호(영문+숫자+특수기호 8자이상 20자이내)'
                    inputype='text'
                    value={newPassword}
                    onChange={(value: any) => setNewPassword(value)}
                  />
                  <ChangePlace
                    name='confirmPassword'
                    inputholder='새 비밀번호 확인'
                    inputype='text'
                    value={confirmPassword}
                    onChange={(value: any) => setConfirmPassword(value)}
                  />
                </div>
                <Confichange
                  className='비밀번호 변경'
                  title='비밀번호 변경'
                  onClick={passwordChange}
                />
                {passwordMessage && <p className={styled.passdMessageP}>{passwordMessage}</p>} {/* 비밀번호 관련 메시지 출력 */}
              </>
            )}
            <FooterMemWith onClick='' />
          </>

        ) : (

          // 구매정보
          <>
            <QueryClientProvider client={queryClient}>
              <PurchaseInfo />
            </QueryClientProvider>
          </>
        )}
      </div>
    </div>
    <Footerbar />
  </>)
}

export default InfoForm

