import Header from '@/app/_components/header/header'
import styled from './foundid.module.css'

const Found = () => {
  return (<>
    <Header showBackButton={false} />
    <div className={styled.found_id}>
      <span>아이디</span>
      <span>찾은 이메일 보여주기</span>
      <button>확인 버튼 누르면 로그인 페이지로 이동</button>
    </div>
  </>)
}

export default Found