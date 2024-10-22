"use client"
import React, { useState, useEffect } from 'react'
import Input from '../components/Input'
import styled from './style.module.css'

// 인풋과 버튼에 넣을 동적 상태 값을 파악하여 props로 전달받기
const ChangePlace = ({ name, inputype, inputholder, onChange, value }: { value: any, onChange: any, name: string, inputype: string, inputholder: string | undefined }) => {

  const [inputValue, setInputValue] = useState(value)

  // props로 받은 value가 변경되면 inputValue도 업데이트
  useEffect(() => {
    setInputValue(value)
  }, [value])

  // input 필드의 값이 변경될 때 상태 업데이트
  const inputChangeHeader = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
    onChange(e.target.value)
  }

  return (
    <div className={styled.changestyl}>
      {/* input에 동적으로 관리하는 value할당 및 이벤트 핸들러 함수 속성 부여하기 */}
      <Input
        name={name}
        inputype={inputype}
        className={styled.changestylInput}
        inputholder={inputholder}
        value={inputValue}
        onChange={inputChangeHeader}
      />
    </div>
  )
}

export default ChangePlace

