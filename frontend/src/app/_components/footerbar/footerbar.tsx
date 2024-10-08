import Link from 'next/link'
import styled from './footerbar.module.css'



const Footerbar = () => {

  return (<>
    <div className={styled.footerBox}>
      <Link href="/">상품</Link>
      <Link href="/">홈</Link>
      <Link href="/storagebox">보관함</Link>
      <Link href="/">마이페이지</Link>
    </div>
  </>)
}

export default Footerbar