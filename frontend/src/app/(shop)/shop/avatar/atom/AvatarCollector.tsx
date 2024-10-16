"use client"

import React, { useContext, useEffect, useState } from 'react'
import { Store } from '../comoponents/User'

const AvatarCollector = (props: {
  productId: number,
  buyPopup: boolean,
  setBuyPopup: Function
}) => {

  const {
    buyState, 
    setBuyState,
    wearState,
    setWearState } = useContext(Store);
  
  const handlePopup = (e: React.MouseEvent) => {
    if(buyState) return
    setBuyState(!buyState);
    props.setBuyPopup(!props.buyPopup);
  };

  return (
    <div style={{width: "100%", height: "100%"}}>
      <div style={{
        width: "100%", 
        height: "110px",
        borderRadius: "10px",
        border: "3px solid black"
      }}
      onClick={handlePopup}
      key={props.productId}
      >
        <img  src="" alt=""/>
      </div>
      {<p style={{
        textAlign: "center",
        fontWeight: 'bold'
      }}>{buyState ? "보유중" : wearState ? "착용중" : "판매중" }</p>}
    </div>
  ) 
}

export default AvatarCollector
