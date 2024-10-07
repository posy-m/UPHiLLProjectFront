"use client"
import React from 'react';
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber, PhoneAuthProvider, signInWithCredential, initializeAuth } from 'firebase/auth';
import { getApp, initializeApp } from 'firebase/app';

import { useEffect, useState } from 'react';
import PhoneAuthConfirm from './PhoneAuthConfirm';

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
export default function Auth(props: AuthProps) {

  const API_KEY = process.env.NEXT_PUBLIC_API_KEY
  const AUTH_DOMAIN = process.env.NEXT_PUBLIC_AUTH_DOMAIN
  const PROJECT_ID = process.env.NEXT_PUBLIC_PROJECT_ID
  const STORAGE_BUCKET = process.env.NEXT_PUBLIC_STORAGE_BUCKET
  const MESSAGING_SENDER_ID = process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID
  const APP_ID = process.env.NEXT_PUBLIC_APP_ID
  const MEASUREMENT_ID = process.env.NEXT_PUBLIC_MEASUREMENT_ID

  const [phone, setPhone] = useState("");
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
  // const firebaseConfig = {
  //   apiKey: "AIzaSyA9o-ilsFl7nl0pcSIdUqIb68ee4sbjvPE",
  //   authDomain: "test-app-699c0.firebaseapp.com",
  //   projectId: "test-app-699c0",
  //   storageBucket: "test-app-699c0.appspot.com",
  //   messagingSenderId: "492107781045",
  //   appId: "1:492107781045:web:d1de617a91a74c92d8bffc",
  //   measurementId: "G-XM4FGXSFZJ"
  // };


  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  useEffect(() => {
    // const test = new RecaptchaVerifier(auth, document.getElementById('recap') as HTMLDivElement);

    //const recap = new RecaptchaVerifier(auth, document.getElementById('recap') as HTMLDivElement)

    setRecap(new RecaptchaVerifier(auth, document.getElementById('recap') as HTMLElement));
  }, [])


  const click = (e: Event) => {
    const { phoneNumber: phone } = props.formData;
    const phoneNumber = phone.replace("0", "+82");
    console.log(phoneNumber);

    signInWithPhoneNumber(auth, phoneNumber, recap)
      .then((confirmationResult) => {
        // alert("sms 요청")
        window.confirmationResult = confirmationResult;
        console.log(1)
        console.log(window);
        setSend(true)
      }).catch(error => {
        console.log(2)
        console.error(error)
      });

  }
  return (
    <div className={styled.auth}>
      <input type={props.type} placeholder={props.placeholder} name={props.name} maxLength={props.maxLength} onChange={props.onChange} />
      <button type="button" onClick={click}>요청</button>
      <div id='recap'></div>
      {send ? <PhoneAuthConfirm setFn={props.value} /> : ''}
    </div>
  );
}
