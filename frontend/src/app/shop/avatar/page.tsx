'use client';
import {ReactNode, useEffect, useState} from 'react'
import Avatar from './comoponents/Avatar';
import Link from 'next/link';
import AddBtn from './comoponents/AddBtn';
import Popup from './comoponents/Popup';
import axios from 'axios';
import Modify from './comoponents/Modify';
import styled from './page.module.css';

const Page = () => {
  const [isPopup, setIsPopup] = useState<boolean>(false);
  const [modifyPopup, setModifyPopup] = useState<boolean>(false);
  const [avatarArray, setAvatarArray] = useState<Array<{name: string, price: number, image: string}>>([]);
  
  // const {data} = await axios.get("/shop/:avatar");
  // try {
    
  // } catch (error) {
  //   console.log("데이터를 불러오는 동안 에러 발생", error);
  // }


  const avatarId: string = "1";

  return (
    <>
      <div className="avartar-wrap" style={{background: "brown", width: '360px', height: '800px', overflow: 'hidden', position: 'relative'}}>
        <div>
          <ul className={styled.product_ul}>
            <li><Link href="">아바타</Link></li>
            <li><Link href="">상품</Link></li>
          </ul>
          <ul className={styled.avatar_ul}>
            {avatarArray.map((e, index) => <li key={e.name}><Avatar setModifyPopup={setModifyPopup} modifyPopup={modifyPopup} price={e.price} image={e.image}/></li>)}
            {/* <Avatar avatarId={avatarId} /> */}
            
          </ul>
        </div>
        <AddBtn isPopup={isPopup} setIsPopup={setIsPopup} />
        { isPopup ? <Popup isPopup={isPopup} setIsPopup={setIsPopup} avatarArray={avatarArray} setAvatarArray={setAvatarArray}/> : '' }
        { modifyPopup ? <Modify /> : '' }
      </div>
    </>
  )
}

export default Page;