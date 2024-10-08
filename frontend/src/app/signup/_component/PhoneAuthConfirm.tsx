import React, { ChangeEvent, useState } from 'react';
import { ConfirmationResult } from 'firebase/auth';



const PhoneAuthConfirm = ({ setFn }: { setFn: Function }) => {
  const [code, setCode] = useState<Number>(0);
  // console.log(window.confirmationResult)
  const confirm = () => {

    window.confirmationResult.confirm(code).then(result => {
      console.log(result);
      setFn(true);
    }).catch(error => {
      console.log(error)
    })
    // ConfirmationResult.confirm(code).then(result => {
    //     console.log(result);
    // })

  }
  return (
    <>
      <input type="text" onChange={(e: ChangeEvent) => setCode(parseInt((e.target as HTMLInputElement).value))} />
      <button onClick={confirm}>인증확인</button>
    </>
  )
}

export default PhoneAuthConfirm
