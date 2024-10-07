import Link from 'next/link'
import styled from './completepage.module.css'



const Completepgae = () => {


  return (<>
    <div className={styled.completepgae}>
      <span>회원가입을 축하드립니다🎉</span>
      <Link href={'/'}>확인</Link>
    </div>
  </>)
}

export default Completepgae