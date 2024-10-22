"use client"
import React, {useState,useEffect} from 'react'
import Button from '../components/Button'
import styled from './style.module.css'

const Confichange = ({title,onClick,className}:{title:string,onClick:any,className : string}) => {

  const [buttonTitle,setButtonTitle] = useState(title)
  return (
    <div className={styled.confichangeTop}>
         {/* 버튼에 onClick함수 생성 후 할당하기 */}
          <Button 
            className={styled.confichangeButton} 
            title={buttonTitle}
            onClick={()=>onClick()}
            />
    </div>
  )
}

export default Confichange
