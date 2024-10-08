import React from 'react'
import Ttext from '../components/Ttext'
import styled from './style.module.css'

const MypsgeText = () => {
  return (
    <div>
        <div className={styled.infotext}>
        <Ttext spanchild='text-base'>$10000</Ttext>
        </div>

        <div className={styled.infotext}>
        <Ttext spanchild='text-base'>이메일 아이디보여지는곳</Ttext>
        </div>
    </div>
  )
}

export default MypsgeText
