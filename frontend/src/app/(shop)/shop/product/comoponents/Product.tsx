'use client'

import { useEffect, useState } from 'react';
import styled from './product.module.css'
// import Popup from './Popup';
import axios from 'axios';
const Product = ({setProductId,updated,setUP,productId, modifyPopup, setModifyPopup, name, price, image}: {updated:boolean,setProductId:Function,setUP:Function,productId: number, modifyPopup: boolean,setModifyPopup: Function, name: string, price: number, image:string}) => {

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
    <div className={styled.product_wrap}>
      <div className={styled.product_img}>
        <img src={`http://localhost:4000/${image}`} />
      </div>
      <div className={styled.product_desc}>
        <p className={styled.product_title}>{name}<br /><span className={styled.product_price}>{price}원</span></p>
      </div>
      <div className={styled.product_btn}>
        <span onClick={() => {setModifyPopup(!modifyPopup); setProductId(productId)}} className="button">수정</span>
        <span onClick={()=>{handleDelete(productId)}} className="button">삭제</span>
      </div>
      {/* <div className={styled.avatar_img}>
        {<img src={image} className={styled.avatar_bg} />}
        <span>{price} Cash</span>
      </div>
      <div className={styled.avatar_btn}>
        <span onClick={() => {setModifyPopup(!modifyPopup); setProductId(productId)}} className="button">수정</span>
        <span onClick={()=>{handleDelete(productId)}} className="button">삭제</span>
      </div> */}
    </div>
  )
}

export default Product;