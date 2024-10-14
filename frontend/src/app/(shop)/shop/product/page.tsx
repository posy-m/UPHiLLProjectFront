'use client';
import {ReactNode, useEffect, useState} from 'react'
import Link from 'next/link';
import AddBtn from './comoponents/AddBtn';
import Popup from './comoponents/Popup';
import axios from 'axios';
import styled from './page.module.css';
import Product from './comoponents/Product';
import Modify from '../avatar/comoponents/Modify';

const Page = () => {
  const [isPopup, setIsPopup] = useState<boolean>(false);
  const [modifyPopup, setModifyPopup] = useState<boolean>(false);
  const [avatarArray, setAvatarArray] = useState<Array<{id: number,name: string, price: number, image: string}>>([]);
  const [updated ,setUpdate]=useState(false);
  const [productId, setProductId] = useState(0);
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState(0);


  const dataAsync = async () => {
    try {
      const {data} = await axios.get("http://localhost:4000/shop/product");
      console.log("아바타 데이터가 잘 들어왔어", data);
      setAvatarArray(data)
    } catch (error) {
      console.log("아타를 못 불러왔어", error);
    }
  }
  // 비동기 함수 최초의 한번만 실행할 hook
  useEffect(() => {
    dataAsync();
  }, [updated]);

  return (
    <>
      <div className="avartar-wrap" style={{background: "brown", width: '360px', height: '800px', overflow: 'scroll', position: 'relative'}}>
        <div>
          <ul className={styled.product_ul}>
            <li><Link href="http://localhost:3000/shop/avatar">아바타</Link></li>
            <li>상품</li>
          </ul>
          <ul className={styled.avatar_ul}>
            {avatarArray.map((e, index) => <li key={e.id}><Product name={e.name} productId={e.id} updated={updated} setUP={setUpdate} setProductId ={setProductId} setModifyPopup={setModifyPopup} modifyPopup={modifyPopup} price={e.price} image={e.image}/></li> )}
          </ul>
        </div>
        <AddBtn isPopup={isPopup} setIsPopup={setIsPopup} modifyPopup={modifyPopup}/>
        { isPopup ? <Popup isPopup={isPopup} setIsPopup={setIsPopup}/> : '' }
        { modifyPopup ? <Modify productId={productId} setModifyPopup={setModifyPopup} modifyPopup={modifyPopup}/> : '' }
      </div>
      {/* <Modify> */}
    </>
  )
}

export default Page;