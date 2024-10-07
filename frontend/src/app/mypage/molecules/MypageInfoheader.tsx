import React from 'react'
import Ttext from '../components/Ttext'
import styled from './style.module.css'

const MypageInfoheader = () => {
  return (
    <div className={styled.infoheader}>
        <Ttext spanchild='mr-2'>개인정보</Ttext> | <Ttext spanchild='ml-2'>구매정보</Ttext>
        </div>
  )
}

export default MypageInfoheader
