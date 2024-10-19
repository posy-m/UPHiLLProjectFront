"use client"
import React, { useState } from 'react'
import Ttext from '../components/Ttext'
import styled from './style.module.css'

interface MypageInfoheaderProps{
  select:string;
  setSelect: (value:string)=>void
}

  const MypageInfoheader = ({select,setSelect}:MypageInfoheaderProps) => {
  const clickHandler = (click:string) =>{
    setSelect(click)
  }


  return (
    <div className={styled.infoheader}>
      <div className={`${styled.click} ${select === '개인정보' ? styled.active : ''}`}
      onClick={()=>clickHandler('개인정보')}>
        <Ttext className=' ' onClick={()=>{}} >개인정보</Ttext> 
      </div>
        
      <div className={`${styled.click} ${select === '구매정보' ? styled.active : ''}`}
      onClick={()=>clickHandler('구매정보')}>
        <Ttext className=''onClick={()=>{}} >구매정보</Ttext>
      </div>
    </div>
  )
}

export default MypageInfoheader
