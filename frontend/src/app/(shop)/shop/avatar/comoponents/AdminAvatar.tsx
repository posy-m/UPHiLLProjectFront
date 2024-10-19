'use client'

// import { useEffect, useState } from 'react';
import customAxios from '@/lib/customAxios';
import styled from './adminAvatar.module.css'

const AdminAvatar = ({ setProductId, productId, modifyPopup, setModifyPopup, price, image, refetch }: { setProductId: Function, productId: number, modifyPopup: boolean, setModifyPopup: Function, price: number, image: string, refetch: Function }) => {

  const handleDelete = (key: number) => {
    const deleteQuestion = confirm('정말 삭제 하시겠습니까?');
    // 삭제가 취소되면 실행되는 로직
    if (!deleteQuestion) {
      console.log('삭제가 취소 됐습니다.');
      return;
    }

    customAxios.delete(`/shop/${key}`).then(response => {
      console.log("아바타가 삭제 됐습니다.", response);
      refetch()
    }).catch(error => console.log("아바타 삭제 가 실패", error));
  }

  return (
    <div className={styled.avatar_wrap}>
      <div className={styled.avatar_img}>
        {<img src={image} className={styled.avatar_bg} />}
        <span>{price} P</span>
      </div>
      <div className={styled.avatar_btn}>
        <span onClick={() => { setModifyPopup(!modifyPopup); setProductId(productId) }} className="button">수정</span>
        <span onClick={() => { handleDelete(productId) }} className="button">삭제</span>
      </div>
    </div>
  )
}

export default AdminAvatar;