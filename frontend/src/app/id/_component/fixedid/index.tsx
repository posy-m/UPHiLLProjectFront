
import axios from 'axios'
import styled from './foundid.module.css'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import customAxios from '@/lib/customAxios'

const FixedId = ({ phoneNumber }: { phoneNumber: string }) => {
  // console.log(phoneNumber);

  const [email, setEmail] = useState("")

  const findEmail = async () => {
    try {
      const response = await customAxios.post("/user/findid", { phoneNumber });
      // console.log(response);

      const emailData = response.data
      setEmail(emailData)
    } catch (error) {
      console.error(error, "아이디찾기에서 fixedid에서 오류")
    }
  }

  useEffect(() => {

    findEmail();

  }, []);


  return (<>
    <div className={styled.found_id}>
      <span>이메일</span>
      <span>{email}</span>
      <Link href={'/'}>확인</Link>
    </div>
  </>)
}

export default FixedId