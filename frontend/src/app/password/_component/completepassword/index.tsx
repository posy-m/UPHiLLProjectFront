import Link from 'next/link'
import styled from './completepassword.module.css'
import axios from 'axios'

const CompletePassword = () => {

  return (<>
    <div className={styled.completepgae}>
      <span>비밀번호 변경이 완료되었습니다.</span>
      <Link href={'/'}>확인</Link>
    </div>
  </>)
}

export default CompletePassword