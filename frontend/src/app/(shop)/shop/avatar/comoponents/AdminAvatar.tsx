'use client'

// import { useEffect, useState } from 'react';
import customAxios from '@/lib/customAxios';
import styled from './adminAvatar.module.css'

const AdminAvatar = ({ product, setProductId, productId, modifyPopup, setModifyPopup, price, image, refetch }: { product: any, setProductId: Function, productId: number, modifyPopup: boolean, setModifyPopup: Function, price: number, image: string, refetch: Function }) => {

  const handleDelete = () => {
    const deleteQuestion = confirm('정말 삭제 하시겠습니까?');
    // 삭제가 취소되면 실행되는 로직
    if (!deleteQuestion) {
      console.log('삭제가 취소 됐습니다.');
      return;
    }

    customAxios.delete(`/shop/${product.id}`).then(response => {
      console.log("아바타가 삭제 됐습니다.", response);
      refetch()
    }).catch(error => console.log("아바타 삭제가 실패", error));
  }

  const openModifyPopup = () => {
    setModifyPopup(!modifyPopup);
    setProductId(product.id);
  }

  return (
    <div className={styled.avatar_wrap}>
      <div className={styled.avatar_img}>
        <img src={`http://127.0.0.1:4000${product.image}`} className={styled.avatar_bg} />
        <span>{product.price} P</span>
      </div>
      <div className={styled.avatar_btn}>
        <span onClick={openModifyPopup} className="button">수정</span>
        <span onClick={handleDelete} className="button">삭제</span>
      </div>
    </div>
  )
}

export default AdminAvatar;