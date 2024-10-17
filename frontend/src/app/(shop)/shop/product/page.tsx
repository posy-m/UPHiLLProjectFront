import React from 'react'
import Admin from './comoponents/Admin'
import User from './comoponents/User'

const page = () => {
  // const {} = useAtom();
  const auth:string = '일반'
  // const [authCompare, setAuthCompare] = useAtom<object>({
  //   email: '',
  //   nickName: '',
  //   point: '',
  //   image: ''
  // });
 
    return (
      <>
        {
          auth === "일반" ? <User /> : <Admin />
        }
      </>
  )
}

export default page
