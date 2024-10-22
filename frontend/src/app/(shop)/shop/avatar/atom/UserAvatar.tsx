import { userInfo } from '@/app/(jotai)/atom';
import { useAtom } from 'jotai';
import React from 'react';

const UserAvatar = () => {
  const [user, setUser] = useAtom(userInfo);
  return (
    <div style={{
      display: "flex",
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: "column",
      padding: '20px 0 0'
    }}>
      <div style={{ width: "100px", height: "100px", border: "1px solid green", borderRadius: "10px" }}>
        <img src={`http://127.0.0.1:4000${user.image}`} alt="" />
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
