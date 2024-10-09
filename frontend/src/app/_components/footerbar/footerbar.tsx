import Link from 'next/link'
import styled from './footerbar.module.css'
import Image from 'next/image'
import shoppingCart from '../../../../public/shoppingCart.png'
import mountin from '../../../../public/mountin.png'
import box from '../../../../public/box.png'
import mypage from '../../../../public/person.png'



const Footerbar = () => {

  return (<>
    <div className={styled.footerBox}>
      <Link href="/">
        <Image src={shoppingCart} alt='store image' width={35} height={35} />
      </Link>
      <Link href="/">
        <Image src={mountin} alt='mountin image' width={35} height={35} />
      </Link>
      <Link href="/storagebox">
        <Image src={box} alt='mountin image' width={35} height={35} />
      </Link>
      <Link href="/">
        <Image src={mypage} alt='mountin image' width={35} height={35} />
      </Link>
    </div>
  </>)
}

export default Footerbar