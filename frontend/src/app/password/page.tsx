"use client"
import { useEffect, useState } from 'react'
import CompletePassword from './_component/completepassword'
import Findpassword from './_component/findpassword'
import Fixdpassword from './_component/fixedpassword'


const Password = () => {
  // const [page, setPage] = useState(1);
  const [dev, setDev] = useState("find");
  const [email, setEmail] = useState("");

  return (<>

    {dev === "find" && <Findpassword setFn={setDev} setEmail={setEmail} />}
    {dev === "fixed" && <Fixdpassword setFn={setDev} email={email} />}
    {dev === "complete" && <CompletePassword />}
    {/* {page === 1 ? <Findpassword setFn={setPage} setEmail={setEmail} /> : page === 2 ? <Fixdpassword email={eamil} setFn={setPage} /> : <CompletePassword />} */}
    {/* <Fixdpassword />
    <CompletePassword /> */}

  </>)
}

export default Password