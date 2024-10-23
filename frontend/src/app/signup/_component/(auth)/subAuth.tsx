"use client"
import React from 'react';
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber, PhoneAuthProvider, signInWithCredential, initializeAuth } from 'firebase/auth';
import { getApp, initializeApp } from 'firebase/app';
import { useEffect, useState } from 'react';
import PhoneAuthConfirm from '../PhoneAuthConfirm';
import customAxios from '@/lib/customAxios';

import styled from './auth.module.css'

type a = {
  email: string,
  userName: string,
  nickName: string,
  birthDate: string,
  phoneNumber: string,
  password: string,
  checkPassword: string,
}

interface AuthProps {
  type: string;
  placeholder: string;
  name: string;
  maxLength: number;
  formData: a,
  phoneAuth: boolean,
  value: Function,
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
}
//export default function Auth(props: AuthProps) {
export default function SubAuth(props: AuthProps) {

  const [phoneError, setPhoneError] = useState<string>('')
  const [phoneCheck, setPhoneCheck] = useState<string>('')

  const API_KEY = process.env.NEXT_PUBLIC_API_KEY
  const AUTH_DOMAIN = process.env.NEXT_PUBLIC_AUTH_DOMAIN
  const PROJECT_ID = process.env.NEXT_PUBLIC_PROJECT_ID
  const STORAGE_BUCKET = process.env.NEXT_PUBLIC_STORAGE_BUCKET
  const MESSAGING_SENDER_ID = process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID
  const APP_ID = process.env.NEXT_PUBLIC_APP_ID
  const MEASUREMENT_ID = process.env.NEXT_PUBLIC_MEASUREMENT_ID

  const [recap, setRecap] = useState<any>(null);
  const [send, setSend] = useState(false);

  const authInfo = { verificationId: '' }


  const firebaseConfig: any = {
    apiKey: API_KEY,
    authDomain: AUTH_DOMAIN,
    projectId: PROJECT_ID,
    storageBucket: STORAGE_BUCKET,
    messagingSenderId: MESSAGING_SENDER_ID,
    appId: APP_ID,
    measurementId: MEASUREMENT_ID

  };

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  useEffect(() => {
    // const test = new RecaptchaVerifier(auth, document.getElementById('recap') as HTMLDivElement);

    //const recap = new RecaptchaVerifier(auth, document.getElementById('recap') as HTMLDivElement)

    setRecap(new RecaptchaVerifier(auth, document.getElementById('recap') as HTMLElement));
  }, [])


  const phoneRegex = /^01([0|1|6|7|8|9])-([0-9]{3,4})-([0-9]{4})$/;


  const click = async () => {
    try {
      if (phoneCheck) {
        setPhoneError('')
      }
      // 메세지 요청
      const { phoneNumber: phone } = props.formData;
      const phoneNumber = phone.replace("0", "+82");
      console.log(phoneNumber);
      if (!phoneRegex.test(phone)) {
        setPhoneError("올바른 형식을 입력해주세요 (010-1234-5678)");
        return
      } else {
        setPhoneError('')
      }
      signInWithPhoneNumber(auth, phoneNumber, recap)
        .then((confirmationResult) => {
          // alert("sms 요청")
          window["confirmationResult"] = confirmationResult;
          // console.log(1)
          // console.log(window);
          setSend(true)
        }).catch(error => {
          // console.log(2)
          console.error(error)
        });

    } catch (error) {
      console.log(error, "subAuth 컴포넌트 오류");
    }
  }
  return (
    <div className={styled.auth}>
      <input type={props.type} placeholder={props.placeholder} name={props.name} maxLength={props.maxLength} onChange={props.onChange} />
      <button type="button" onClick={click}>요청</button>
      <div id='recap'></div>
      {phoneError && <p className={styled.confirm}>{phoneError}</p>}
      {send ? <PhoneAuthConfirm setFn={props.value} /> : ''}
    </div>
  );
}
