import React from 'react';

const UserAvatar = () => {
  return (
    <div style={{
      display: "flex",
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: "column",
      padding: '20px 0 0'
    }}>
      <div style={{ width: "120px", height: "120px", border: "5px solid green", borderRadius: "10px"}}>
        <img src="" alt="" />
      </div>
      <p style={{
        fontWeight: "bold",
        fontSize: '22px',
        marginTop: "10px"
      }}>
        4000 P
      </p>
    </div>
  )
}

export default UserAvatar;
