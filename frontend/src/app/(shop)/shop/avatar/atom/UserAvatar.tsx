import { userInfo } from '@/app/(jotai)/atom';
import { useAtom } from 'jotai';
import React from 'react';

const UserAvatar = () => {
  const [user, setUser] = useAtom(userInfo);
  console.log(user)
  return (
    <div style={{
      display: "flex",
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: "column",
      padding: '20px 0 0'
    }}>
      <div style={{ width: "100px", height: "100px", border: "1px solid green", borderRadius: "10px" }}>
        <img src={`https://uphillmountain.store/back${user.image}`} alt="착용중인 아바타" style={{ width: "100%", height: "100%", borderRadius: "10px" }} />
      </div>
      <p style={{
        fontWeight: "bold",
        fontSize: '22px',
        marginTop: "5px"
      }}>
        {user.point} P
      </p>
    </div>
  )
}

export default UserAvatar;
