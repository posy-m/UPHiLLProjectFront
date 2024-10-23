import React from 'react'
import Ttext from '../components/Ttext'
import styled from './style.module.css'

const MypsgeText = ({ user }: { user: any }) => {
  console.log(user)
  return (
    <div >
      <div className={styled.infotextTop}>
        <Ttext className={styled.mysgeTextPoints} onClick={() => { }}>잔여 포인트 : {user.point} P</Ttext>
      </div>

      <div className={styled.infotext}>
        <Ttext className={styled.mysgeTextEmail} onClick={() => { }} >{user.email}</Ttext>
      </div>
    </div>
  )
}

export default MypsgeText
