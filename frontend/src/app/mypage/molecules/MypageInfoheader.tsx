"use client"
import React, { useState } from 'react'
import Ttext from '../components/Ttext'
import styled from './style.module.css'

interface MypageInfoheaderProps{
  select:string;
  setSelect: (value:string)=>void
}

const MypageInfoheader = ({select,setSelect}:MypageInfoheaderProps) => {

  // const [select,setSelect] = useState('개인정보')

  const clickHandler = (click:string) =>{
    setSelect(click)
  }


  return (
    <div className={styled.infoheader}>
      <div className={styled.click}
      onClick={()=>clickHandler('개인정보')}>
        <Ttext className='mr-2 ' onClick={()=>{}} >개인정보</Ttext> 
      </div>
        
      <div className={styled.click}
      onClick={()=>clickHandler('구매정보')}>
        <Ttext className='ml-2'onClick={()=>{}} >구매정보</Ttext>
      </div>
    </div>
  )
}

export default MypageInfoheader