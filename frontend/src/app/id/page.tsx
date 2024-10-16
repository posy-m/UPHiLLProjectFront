"use client"

import { useState } from 'react'
import Findid from './_component/findid'
import FixedId from './_component/fixedid'

const FindId = () => {

  const [dev, setDev] = useState("findID")
  const [phoneNumber, setPhoneNumber] = useState("")



  return (<>
    {dev === "findID" && <Findid setFn={setDev} setPhoneNumber={setPhoneNumber} />}
    {dev === "FixedID" && < FixedId phoneNumber={phoneNumber} />}
  </>)
}

export default FindId