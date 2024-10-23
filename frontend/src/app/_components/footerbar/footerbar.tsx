import Link from 'next/link'
import styled from './footerbar.module.css'
import Image from 'next/image'
import shop from '../../../../public/shop.png'
import map from '../../../../public/map.png'
import box from '../../../../public/box.png'
import mypage from '../../../../public/person.png'
import { usePathname } from 'next/navigation'

const Footerbar = () => {
  const path = usePathname();
  const isShopPath = path.startsWith('/shop')

  return (<>
    <div className={styled.footerBox}>
      <Link href="/main" className='color:red'>
        <Image src={map} alt='mountin image' width={50} height={50} className={path === "/main" ? styled.active : ""} />
      </Link>
      <Link href="/shop/avatar">
        <Image src={shop} alt='store image' width={40} height={40} className={isShopPath ? styled.active : ""} />
      </Link>
      <Link href="/storagebox" >
        <Image src={box} alt='mountin image' width={35} height={35} className={path === "/storagebox" ? styled.active : ""} />
      </Link>
      <Link href="/mypage/infoPersonal">
        <Image src={mypage} alt='mountin image' width={40} height={40} className={path === "/mypage/infoPersonal" ? styled.active : ""} />
      </Link>
    </div>
  </>)
}



export default Footerbar