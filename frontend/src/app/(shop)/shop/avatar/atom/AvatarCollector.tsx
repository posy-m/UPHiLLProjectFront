"use client"

import React, { useContext, useEffect, useState } from 'react'
import { Store } from '../comoponents/User'
import UserAvatarBuy from '../comoponents/UserAvatarBuy';
import Image from 'next/image';

const AvatarCollector = ({ product, refetch }: { product: any, refetch: Function }) => {
  console.log(product.orders.length > 0)
  const [buyPopup, setBuyPopup] = useState<boolean>(false);
  const [status, setStatus] = useState('판매중');
  const {
    buyState,
    setBuyState,
    wearState,
    setWearState } = useContext(Store);

  const getStatus = () => {
    // console.log(product.orders)
    if (product.orders.length > 0 && product.orders[0].usage)
      setStatus('착용중');
    else if (product.orders.length > 0)
      setStatus('보유중')
  }

  useEffect(() => {
    getStatus()
  }, [product])
  const handlePopup = (e: React.MouseEvent) => {
    setBuyPopup(true);
  };

  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", }}>
      {buyPopup ? (
        <div style={{
          position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", backgroundColor: "rgba(0, 0, 0, 0.8)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 9999
        }}>
          <UserAvatarBuy product={product} buyPopup={buyPopup} setBuyPopup={setBuyPopup} orders={product.orders} status={status} refetch={refetch} />
        </div>) : null}
      {/* <div style={{ width: "100%", height: "110px", borderRadius: "10px", border: "1px solid black" }} onClick={handlePopup} > */}
      <div style={{ display: "flex", justifyContent: "center" }} onClick={handlePopup} >
        <img src={`https://uphillmountain.store/back${product.image}`} alt="" style={{ borderRadius: "10px", border: "1px solid gray", width: "130px", height: "130px" }} />
      </div>
      <p style={{ textAlign: "center", fontWeight: 'bold', lineHeight: "20px" }}>{product.name}
        <br />
        {product.price} P
      </p>
      {<p style={{ textAlign: "center", fontWeight: 'bold' }}>{status}</p>}
    </div>
  )
}

export default AvatarCollector
