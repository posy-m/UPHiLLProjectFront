import Header from '../_components/header/header'
import styled from './findid.module.css'

const Findid = () => {
  return (<>
    <Header showBackButton={true} />
    <div className={styled.find_id}>
      <span>본인인증</span>
      <input type="text" placeholder='이름' />
      <input type="text" placeholder='휴대폰 번호' />
      <button>아이디 찾기</button>
    </div>
  </>
  )
}

export default Findid
