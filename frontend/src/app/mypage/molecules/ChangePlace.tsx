"use client"
import React, {useState} from 'react'
import Input from '../components/Input'
import Button from '../components/Button'
import styled from './style.module.css'

// const ChangePlace = ({ children} : { children : React.ReactNode}) => {
// 인풋과 버튼에 넣을 동적 상태 값을 파악하여 props로 전달받기
const ChangePlace = ({buttonchild,inputype,inputchild,inputholder,title}:{buttonchild : string, title:string, inputype : string, inputchild: string,inputholder:string | undefined}) => {
  
  const [inputType,setInputType] = useState('')
  const [inputHolder,setInputHolder] = useState(inputholder)
  const [buttonTitle,setButtonTitle] = useState(title)

  return (
        <div className={styled.changestyl}>
            {/* input에 동적으로 관리하는 상태 집어넣기 */}
            <Input inputype={inputType} inputchild='' inputholder={inputHolder} />
            {/* 버튼에 title에 닉네임 변경 및 비밀번호 변경 타이틀 동적 할당하기 */}
            <Button buttonchild='' title={buttonTitle}/>
        </div>

  )
}

export default ChangePlace

