'use client'

import { useEffect, useState } from 'react';
import styled from './avatar.module.css'
import Popup from './Popup';
import axios from 'axios';
const Avatar = ({setProductId,updated,setUP,productId, modifyPopup, setModifyPopup,price, image}: {updated:boolean,setProductId:Function,setUP:Function,productId: number, modifyPopup: boolean,setModifyPopup: Function ,price: number, image:string}) => {

  const handleDelete = (key:number) => {
    const deleteQuestion = confirm('정말 삭제 하시겠습니까?');
    // 삭제가 취소되면 실행되는 로직
    if(!deleteQuestion){
      console.log('삭제가 취소 됐습니다.');
      return;
    }

    axios.delete(`http://localhost:4000/shop/avatar/${key}`).then(response => {
      console.log("아바타가 삭제 됐습니다.", response);
      setUP(!updated)
    }).catch(error => console.log("아바타 삭제 가 실패", error));
  }

  return (
    <div className={styled.avatar_wrap}>
      <div className={styled.avatar_img}>
        {<img src={image} className={styled.avatar_bg} />}
        <span>{price} Cash</span>
      </div>
      <div className={styled.avatar_btn}>
        <span onClick={() => {setModifyPopup(!modifyPopup); setProductId(productId)}} className="button">수정</span>
        <span onClick={()=>{handleDelete(productId)}} className="button">삭제</span>
      </div>
    </div>
  )
}

export default Avatar;