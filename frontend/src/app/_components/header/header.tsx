
import Link from 'next/link'
import styles from './header.module.css'

const Header = ({ showBackButton }: { showBackButton: boolean }) => {
  return (<>
    <div className={styles.headerBox}>
      {showBackButton && <Link href="/">뒤로가기</Link>}
      <div>이미지 컴포넌트</div>
    </div>
  </>
  )
}

export default Header
