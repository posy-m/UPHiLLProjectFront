import Header from '../../_components/header/header'
import styled from './foundpassword.module.css'

const Foundpassword = () => {
  return (<>
    <div>
      <Header showBackButton={true} />
      <div className={styled.found_pw}>
        <span>비밀번호 번경</span>
        <input type="password" placeholder='비밀번호 (영문+숫자+특수기호 8자이상20자이내 )' />
        <input type="password" placeholder='휴대폰 번호 (01012345678)' />
        <button>확인</button>
      </div>
    </div>
  </>)
}

export default Foundpassword 