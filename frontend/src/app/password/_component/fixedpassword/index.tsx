"use client"

import React, { useState } from 'react'
import styled from './foundpassword.module.css'
import { Valiation } from '@/app/signup/valiation'
import axios from 'axios'
import { useSearchParams } from 'next/navigation'
import customAxios from '@/lib/customAxios'

// interface FoundpasswordProps {
//   emailValue: string;
// }

const Fixdpassword = ({ email, setFn }: { email: string, setFn: Function }) => {
  const search = useSearchParams();


  // console.log(emailValue);

  const [formDataValue, setFormDataValue] = useState({
    password: "" as string,
    checkPassword: "" as string,
  })

  // 에러상태
  const [passwordError, setPasswordError] = useState("")
  const [checkPassword, setCheckPasswordError] = useState("")

  const handleInputChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormDataValue({
      ...formDataValue,
      [name]: value
    })

    const formElement = event.currentTarget.form;
    if (formElement) {
      const formData = new FormData(formElement)
      const name = event.target.name;
      try {
        await Valiation(formData, name)
        switch (name) {
          case 'password':
            setPasswordError("");
            break;
          case 'checkPassword':
            setCheckPasswordError("");
            break;
        }
      } catch (error) {
        if (error instanceof Error) {
          switch (name) {
            case 'password':
              setPasswordError(error.message);
              break;
            case 'checkPassword':
              setCheckPasswordError(error.message);
          }
        }
      }
    }

  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    // console.log(formData.email);
    console.log("test")
    try {
      await Valiation(new FormData(event.currentTarget)); // 전체 폼 validation
      await Valiation(formData);
      setPasswordError("");
      setCheckPasswordError("");

      // email porps랑로 전달받기
      if (formDataValue && (formDataValue.password === formDataValue.checkPassword)) {
        console.log(formDataValue.password);
        console.log(formDataValue.checkPassword);

        const responese = await customAxios.put("/user/findpassword",
          { email, password: formDataValue.password })
        setFn("complete")
      }
    } catch (err) {
      if (err instanceof Error) {
        console.error(err.message, "found password 부분 오류");
      }
    }
  };


  return (<>
    <form className={styled.found_password} onSubmit={handleSubmit}>
      <span>비밀번호 번경</span>
      <div className={styled.found_pw}>
        <input type="password" placeholder='비밀번호 (영문+숫자+특수기호 8자이상20자이내)' name='password' maxLength={20} onChange={handleInputChange} />
        {passwordError && <p className={styled.error}>{passwordError}</p>}
      </div>
      <div className={styled.found_pw}>
        <input type="password" placeholder='비밀번호 확인' name='checkPassword' maxLength={20} onChange={handleInputChange} />
        {checkPassword && <p className={styled.error}>{checkPassword}</p>}
      </div>
      <button>확인</button>
    </form >
  </>
  )
}




export default Fixdpassword 