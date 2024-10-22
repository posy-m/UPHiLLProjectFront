import React, { ChangeEvent, useState } from 'react';
import { ConfirmationResult } from 'firebase/auth';
import styled from './phoneauthconfirm.module.css'



const PhoneAuthConfirm = ({ setFn }: { setFn: Function }) => {
  const [code, setCode] = useState<Number>(0);
  const [message, setMessage] = useState('')

  // console.log(window.confirmationResult)
  const confirm = () => {
    window["confirmationResult"].confirm(code).then(result => {
      console.log(result);
      setMessage('인증에 성공했습니다.')
      setFn(true);
    }).catch(error => {
      console.log(error)
      setMessage('인증에 실패했습니다. 다시 시도해주세요.')
    })
    // ConfirmationResult.confirm(code).then(result => {
    //     console.log(result);
    // })

  }
  return (
    <>
      <input type="text" placeholder='인증 코드 6자리를 입력해주세요' maxLength={6} onChange={(e: ChangeEvent) => setCode(parseInt((e.target as HTMLInputElement).value))} />
      <button onClick={confirm}>인증확인</button>
      {message && <p className={styled.confirm}>{message}</p>}
    </>
  )
}

export default PhoneAuthConfirm

