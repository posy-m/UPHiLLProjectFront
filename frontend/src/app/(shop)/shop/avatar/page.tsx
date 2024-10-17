import React from 'react'
import Admin from './comoponents/Admin'
import {User} from './comoponents/User';
import { useAtom } from 'jotai';

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
        {/* {
          auth === "일반" ? <User /> : <Admin />
        } */}
<Admin />

      </>
  )
}
 
export default page;