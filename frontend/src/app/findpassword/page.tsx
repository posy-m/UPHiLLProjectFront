import Header from '../_components/header/header'
import styled from './findpassword.module.css'

const Findpassword = () => {
  return (<>
    <div>
      <Header showBackButton={true} />
      <div className={styled.find_pw}>
        <span>본인인증</span>
        <input type="text" placeholder='이메일' />
        <input type="text" placeholder='휴대폰 번호' />
        <button>비밀번호 변경</button>
      </div>
    </div>
  </>)
}

export default Findpassword