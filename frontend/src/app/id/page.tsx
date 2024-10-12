"use client"

import { useState } from 'react'
import Findid from './_component/findid'
import FixedId from './_component/fixedid'

const FindId = () => {

  const [dev, setDev] = useState("findID")



  return (<>
    {dev === "findID" && <Findid setFn={setDev} />}
    {dev === "FixedID" && < FixedId />}
  </>)
}

export default FindId