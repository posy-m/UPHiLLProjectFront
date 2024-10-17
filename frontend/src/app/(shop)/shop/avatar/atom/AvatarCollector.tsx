"use client"

import React, { useContext, useEffect, useState } from 'react'
import { Store } from '../comoponents/User'
import UserAvatarBuy from '../comoponents/UserAvatarBuy';
import Image from 'next/image';

const AvatarCollector = ({ product }: { product: any }) => {
  console.log(product.orders.length > 0)
  const [buyPopup, setBuyPopup] = useState<boolean>(false);
  const {
    buyState,
    setBuyState,
    wearState,
    setWearState } = useContext(Store);

  const handlePopup = (e: React.MouseEvent) => {
    setBuyPopup(true);
  };

  return (
    <div style={{ width: "100%", height: "100%" }}>
      {buyPopup ? <UserAvatarBuy productId={product.id} buyPopup={buyPopup} setBuyPopup={setBuyPopup} /> : ""}
      <div style={{ width: "100%", height: "110px", borderRadius: "10px", border: "3px solid black" }} onClick={handlePopup} >
        <img src={`http://127.0.0.1:4000${product.image}`} alt="" className='w-full h-full' />
      </div>
      {<p style={{ textAlign: "center", fontWeight: 'bold' }}>{product.orders.length > 0 && product.orders[0].usate ? "착용중" : product.orders.length > 0 ? "보유중" : "판매중"}</p>}
    </div>
  )
}

export default AvatarCollector
