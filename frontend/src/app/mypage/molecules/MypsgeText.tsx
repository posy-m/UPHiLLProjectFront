import React from 'react'
import Ttext from '../components/Ttext'
import styled from './style.module.css'

const MypsgeText = ({email,points,onClick}:{email:any,points:number,onClick:()=>void}) => {
  
  return (
    <div className='mt-10'>
        <div className={styled.infotext}>
        <Ttext spanchild='text-base' onClick={()=>{}}>${points}</Ttext>
        </div> 

        <div className={styled.infotext}>
        <Ttext spanchild='text-base' onClick={()=>{}} >{email}</Ttext>
        </div>
    </div>
  )
}

export default MypsgeText
