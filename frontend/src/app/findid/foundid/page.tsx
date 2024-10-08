
import styled from './foundid.module.css'
import Link from 'next/link'

const Found = () => {
  return (<>
    <div className={styled.found_id}>
      <span>아이디</span>
      <span>찾은 이메일 보여주기</span>
      <Link href={'/'}>확인 버튼 누르면 로그인 페이지로 이동</Link>
    </div>
  </>)
}

export default Found