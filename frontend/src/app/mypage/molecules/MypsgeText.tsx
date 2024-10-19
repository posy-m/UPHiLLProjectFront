import React from 'react'
import Ttext from '../components/Ttext'
import styled from './style.module.css'

const MypsgeText = ({email,points,onClick}:{email:any,points:number,onClick:()=>void}) => {
  
  return (
    <div >
        <div className={styled.infotextTop}>
        <Ttext className={styled.mysgeTextPoints} onClick={()=>{}}>잔여 포인트 : {points} P</Ttext>
        </div> 

        <div className={styled.infotext}>
        <Ttext className={styled.mysgeTextEmail} onClick={()=>{}} >{email}</Ttext>
        </div>
    </div>
  )
}

export default MypsgeText
