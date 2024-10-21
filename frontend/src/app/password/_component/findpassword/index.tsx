"use client"

import { useState } from 'react'
import styled from './findpassword.module.css'
import { Valiation } from '@/app/signup/valiation'
import { useRouter } from "next/navigation";
import Auth from '../../../signup/_component/(auth)/Auth'
import customAxios from '@/lib/customAxios'
import SubAuth from '@/app/signup/_component/(auth)/subAuth';



const Findpassword = ({ setFn, setEmail }: { setFn: Function, setEmail: Function }) => {

  const router = useRouter()

  const [formDataValue, setFromDataValue] = useState({
    email: "" as string,
    userName: "" as string,
    nickName: "" as string,
    birthDate: "" as string,
    phoneNumber: "" as string,
    password: "" as string,
    checkPassword: "" as string,
  })

  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [phoneAuth, setPhoneAuth] = useState(false)

  const [emailValue, setEmailValue] = useState("")



  const handleEmailChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    // setData(event.target.value)
    const { name, value } = event.target;
    console.log(name, value)
    setFromDataValue({
      ...formDataValue,
      [name]: value
    })

    const formElement = event.currentTarget.form;
    if (formElement) {
      const formData = new FormData(formElement)
      const name = event.target.name;
      try {
        await Valiation(formData, name);
        switch (name) {
          case 'email':
            setEmailError("");
            break;
          case 'phoneNumber':
            setPhoneError("");
            break;
        }
      } catch (error) {
        if (error instanceof Error) {
          switch (name) {
            case 'email':
              setEmailError(error.message);
              break;
            case 'phoneNumber':
              setPhoneError(error.message);
          }
        }
      }
    }
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    // console.log(formData.email);


    try {
      // await Valiation(new FormData(event.currentTarget)); // 전체 폼 validation
      await Valiation(formData);
      setEmailError("");
      setPhoneError("");
      // email 확인
      const checkeEmailResponses = await customAxios.post("/user/findpw", { email: formDataValue.email })
      const checkEmailData = checkeEmailResponses.data
      // 휴대폰번호 인증되면 보내기
      if (formDataValue && (checkEmailData && phoneAuth)) {
        // && phoneAuth
        // router.push(`/fixedpassword`);
        setEmail(formDataValue.email);
        setFn("fixed")
      }
    } catch (err) {
      if (err instanceof Error) {
        console.error(err.message, "found password 부분 오류");
      }
    }
  }




  return (<>
    <form className={styled.find_password} onSubmit={handleSubmit}>
      <span>본인인증</span>
      <div className={styled.find_pw}>
        <input type="text" placeholder='이메일' name='email' onChange={handleEmailChange} value={formDataValue.email} />
        {emailError && <p>{emailError}</p>}
      </div>
      <div className={styled.find_pw}>
        {/* <input type="text" placeholder='휴대폰 번호 (01012345678)' name='phoneNumber' maxLength={11} onChange={handleEmailChange} /> */}
        <SubAuth type="text" phoneAuth={phoneAuth} value={setPhoneAuth} formData={formDataValue} placeholder='휴대폰 번호 (010-1234-5678)' name='phoneNumber' maxLength={13} onChange={handleEmailChange} />
        {phoneError && <p>{phoneError}</p>}
      </div>
      <button>비밀번호 변경</button>
    </form>

    {/* <Foundpassword /> */}

  </>)
}



export default Findpassword