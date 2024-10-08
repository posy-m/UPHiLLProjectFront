import React from 'react'
import MypageInfoheader from './MypageInfoheader'
import MypsgeText from './MypsgeText'
import ChangePlace from './ChangePlace'
import Ttext from '../components/Ttext'
import Input from '../components/Input'
import Button from '../components/Button'
import styled from './style.module.css'

const InfoForm = () => {
  return (
    <div>
        <MypageInfoheader></MypageInfoheader> 

        <MypsgeText ></MypsgeText>
         {/* 인풋과 버튼에 넣을 동적 상태 값을 파악하여 props로 전달하기 */}
        <ChangePlace inputchild='' buttonchild='' inputholder='아이디' inputype='text' title='닉네임 변경' />
        <ChangePlace inputchild='' buttonchild='' inputholder='비밀번호' inputype='text' title='비밀번호 변경' />

        <div className='w-full flex justify-center mt-10'>
            <Ttext spanchild='mr-2'>로그아웃</Ttext> | <Ttext spanchild='ml-2'>회원탈퇴</Ttext>
        </div>

    </div>
  )
}

export default InfoForm
    