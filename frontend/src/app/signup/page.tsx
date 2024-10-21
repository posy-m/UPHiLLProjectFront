"use client"

import React, { useState } from 'react'
import styled from './signup.module.css'
import { Valiation } from './valiation'
import axios from 'axios'
import Auth from './_component/(auth)/Auth'
import { useRouter } from "next/navigation";
import customAxios from '@/lib/customAxios'

const Signup = () => {

  // input 상태
  const [formDataValue, setFormDataValue] = useState({
    email: "" as string,
    userName: "" as string,
    nickName: "" as string,
    birthDate: "" as string,
    phoneNumber: "" as string,
    password: "" as string,
    checkPassword: "" as string,
  });


  // 중복검사 샹태
  const [emailCheck, setEmailCheck] = useState<boolean | null>(null); // 이메일 중복 체크 상태
  const [nickNameCheck, setNickNameCheck] = useState<boolean | null>(null); // 이메일 중복 체크 상태


  // 에러 상태
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [checkPassword, setCheckPasswordError] = useState("")
  const [nickNameError, setNickNameError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [birthError, setBirthError] = useState("");
  const [phoneAuth, setPhoneAuth] = useState(false)

  const router = useRouter()




  // input태그 handler 함수
  const handleInputChange = async (event: React.ChangeEvent<HTMLInputElement>) => {

    const { name, value } = event.target;
    // console.log(name, value);
    setFormDataValue({
      ...formDataValue,
      [name]: value
    })

    const formElement = event.currentTarget.form;
    if (formElement) {
      const formData = new FormData(formElement);
      const name = event.target.name;
      try {
        await Valiation(formData, name);
        // 특정 필드의 오류를 초기화
        switch (name) {
          case 'email':
            setEmailError("");
            break;
          case 'password':
            setPasswordError("");
            break;
          // case 'nickName':
          //   setNickNameError("");
          //   break;
          case 'phoneNumber':
            setPhoneError("");
            break;
          case 'birthDate':
            setBirthError("");
            break;
          case 'checkPassword':
            setCheckPasswordError("");
            break;
        }
      } catch (err) {
        if (err instanceof Error) {
          switch (name) {
            case 'email':
              setEmailError(err.message);
              break;
            case 'password':
              setPasswordError(err.message);
              break;
            // case 'nickName':
            //   setNickNameError(err.message);
            //   break;
            case 'phoneNumber':
              setPhoneError(err.message);
              break;
            case 'birthDate':
              setBirthError(err.message);
              break;
            case 'checkPassword':
              setCheckPasswordError(err.message);
          }
        }
      }
    }
  };

  // email, 닉네임 중복체크
  const DuplicateCheck = async (type: string, name: string) => {

    try {
      const teg = document.querySelector(`input[name=${name}]`) as HTMLInputElement;
      const response = await customAxios.post("/user/duplication", {
        // nickName: formDataValue.nickName,
        // email: formDataValue.email
        type,
        data: teg.value
      })
      const { data } = response.data;
      if (type === 'email') {
        setEmailCheck(data)
      } else if (type === "nickName") {
        setNickNameCheck(data)
      }
    } catch (error) {
      console.error("email,nickName 중복확인", error);
      if (type === 'email') {
        setEmailCheck(true)
      } else if (type === "nickName") {
        setNickNameCheck(true)
      }
    }

  }

  // form태그 event
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    // console.log(formData.email);
    try {
      await Valiation(new FormData(event.currentTarget)); // 전체 폼 validation
      // await Valiation(formData);
      setEmailError("");
      setPasswordError("");
      setNickNameError("");
      setPhoneError("");
      setBirthError("");
      setCheckPasswordError("");
      // 이거 axios 확안해보기!!!!!!!!!!!!!!!!!!!!
      if (formDataValue && (((!nickNameCheck && !emailCheck) && phoneAuth) && (formDataValue.checkPassword === formDataValue.password))) {

        const respones = await customAxios.post("/user/signup", formDataValue)

        router.push('/signup/completepgae')
      }
    } catch (err) {
      if (err instanceof Error) {
        console.error(err.message);
      }
    }
  };

  return (
    <>
      <form className={styled.sign_up} onSubmit={handleSubmit}>
        <span>회원가입</span>
        <div className={styled.check_box}>
          <div className={styled.check_wrap}>
            <input type="text" placeholder='Email을 입력해주세요' name='email' onChange={handleInputChange} />
            <button type="button" onClick={() => { DuplicateCheck('email', 'email') }}>중복확인</button>
            {emailCheck !== null && (
              <p className={emailCheck ? styled.errored : styled.success}>{emailCheck ? '이미 존재하는 이메일입니다.' : '사용할 수 있는 이메일입니다.'}</p>
            )}
            {emailError && <p className={styled.errored}>{emailError}</p>}
          </div>
        </div>
        <input type="text" placeholder='이름' name='userName' onChange={handleInputChange} />
        <div className={styled.check_box}>
          <div className={styled.check_wrap}>
            <input type="text" placeholder='닉네임(5글자 이내)' name='nickName' maxLength={5} onChange={handleInputChange} />
            <button type="button" onClick={() => { DuplicateCheck('nickName', 'nickName') }}>중복확인</button>
            {nickNameCheck !== null && (
              <p className={nickNameCheck ? styled.errored : styled.success}>{nickNameCheck ? '이미 존재하는 닉네임입니다.' : '사용할 수 있는 닉네임입니다.'}</p>
            )}
          </div>
        </div>
        <div className={styled.error}>
          <input type="text" placeholder='생년월일을 입력해주세요. [YYYY-MM-DD]' name='birthDate' maxLength={10} onChange={handleInputChange} />
          {birthError && <p className={styled.errored}>{birthError}</p>}
        </div>
        <div className={styled.error}>
          {/* <input type="text" placeholder='휴대폰 번호 (01012345678)' name='phoneNumber' maxLength={11} onChange={handleInputChange} /> */}
          <Auth phoneProps={formDataValue.phoneNumber} type="text" phoneAuth={phoneAuth} value={setPhoneAuth} formData={formDataValue} placeholder='휴대폰 번호 (010-1234-5678)' name='phoneNumber' maxLength={13} onChange={handleInputChange} />
          {/* {phoneError && <p className={styled.errored}>{phoneError}</p>} */}
        </div>
        <div className={styled.error}>
          <input type="password" placeholder='비밀번호 (영문+숫자+특수기호 8자이상20자이내 )' name='password' maxLength={20} onChange={handleInputChange} />
          {passwordError && <p className={styled.errored}>{passwordError}</p>}
        </div>
        <div className={styled.error}>
          <input type="password" placeholder='비밀번호 확인' name='checkPassword' maxLength={20} onChange={handleInputChange} />
          {checkPassword && <p className={styled.errored}>{checkPassword}</p>}
        </div>
        <button type="submit">회원가입</button>
      </form >
    </>
  )
}

export default Signup;

