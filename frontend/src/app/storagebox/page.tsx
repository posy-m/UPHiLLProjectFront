"use client"
import React from 'react'
import { useState } from 'react'
import CompletedProduct from './_component/completedproduct'
import Using from './_component/using'
import styled from './using.module.css'
import CompletedInfinite from './_component/completedproduct/completedinfinite'


const StorageBox = () => {
  const [use, setUse] = useState(false);
  const change = (value: boolean) => {
    setUse(value);
  }
  return (<>
    <div className={styled.usingBox}>
      <span onClick={() => change(false)} className={!use ? styled.activeTab : ''}>사용 가능</span>
      <span onClick={() => change(true)} className={use ? styled.activeTab : ''}>사용 완료</span>
    </div>
    {/* {use ? <CompletedProduct use={use} /> : <Using use={use} />} */}
    {use ? <CompletedInfinite use={use} /> : <Using use={use} />}
    {/* {use === false && <Using use={use} />}
    {use === true && <CompletedProduct use={use} />} */}
  </>)
}

export default StorageBox