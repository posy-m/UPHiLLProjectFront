import React from 'react'

const AvatarRegist = () => {

  return (
    <form style={{
      background: "beige",
      border: "2px solid black",
      boxSizing: "border-box",
      width: "260px",
      height: "200px",
      overflow: 'hidden',
      borderRadius: '10px',
      position: "absolute",
      zIndex: "1",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)"
    }}>
      <p style={{
        textAlign: 'center',
        fontSize: '22px',
        fontWeight: 'bold',
        margin: '50px 0 18px'
      }}>아바타를<br />구매하시겠습니까?</p>
      <div style={{
        display: "flex",
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <button style={{
          display: "flex",
          backgroundColor: "green",
          color: 'white',
          width: "80px",
          height: "40px",
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: '10px',
          fontWeight: 'bold',
          marginRight: '10px',
          cursor: 'pointer'
        }}>착용</button>
        <span style={{
          display: "flex",
          backgroundColor: "green",
          color: 'white',
          width: "80px",
          height: "40px",
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: '10px',
          fontWeight: 'bold',
          marginLeft: '10px',
          cursor: 'pointer'
        }}>취소</span>
      </div>
    </form>
  )
}

export default AvatarRegist
