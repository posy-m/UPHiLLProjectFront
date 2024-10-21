'use client';

import React, { ReactNode, useEffect, useState } from 'react'
import styled from './popup.module.css'
import customAxios from '@/lib/customAxios';


const Popup = ({ isPopup, setIsPopup, refetch }: { isPopup: boolean, setIsPopup: Function, refetch: Function }) => {
  const [attachment, setAttachment] = useState<string | ArrayBuffer | null>();

  const handleChangeAvatar = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = () => {
        setAttachment(reader.result);
      }
    }
  }

  const avatarFrm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { name, price, image } = e.target as HTMLFormElement;
    const nameValue: string = (name as unknown as HTMLInputElement).value;
    const priceValue: number = parseFloat((price as HTMLInputElement).value);;

    if (!image.files[0]) {
      alert("아바타를 선택해주세요");
      return;
    }

    if (!nameValue || !priceValue) {
      alert("아바타의 이름과 가격을 입력해주세요.");
      return;
    }

    // File 정보 
    const formData = new FormData();

    formData.append('image', image.files[0]);
    formData.append('name', nameValue);
    formData.append('price', priceValue.toString());
    formData.append("type", 'avatar')

    // console.log(formData)

    const response = await customAxios.post('/shop/avatar', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    console.log(response.status)
    if (response.status === 201) {
      console.log(response.status)
      await refetch();
      setIsPopup(!isPopup);
    }
  }

  return (
    <form
      method="post"
      id="avatarFrm"
      className={styled.avatar_frm}
      onSubmit={avatarFrm}
    >
      <div className={styled.frm_wrap}>
        <div className={styled.avatar_img}>
          <label htmlFor='image'>아바타 이미지
            {attachment && <img src={attachment.toString()} className={styled.avatar_upload} />}
          </label>
          <input type="file" id="image" name="image" accept="image/*" onChange={handleChangeAvatar} />
        </div>
        <div className={styled.avatar_info}>
          <div>
            {/* <label htmlFor='name'>이름</label> : */}
            <input type="text" id="name" name="name" placeholder='아바타 이름' />
          </div>
          <div>
            {/* <label htmlFor='price'>가격</label> : */}
            <input type="number" id="price" name="price" placeholder='아바타 가격' />
          </div>
          <p>아바타를 등록하시겠습니까?</p>
          <div className={styled.btn_area}>
            <button id="submitBtn" className={styled.btn}>등록</button>
            <span id="cancelBtn" className={styled.btn} onClick={() => setIsPopup(!isPopup)}>취소</span>
          </div>
        </div>
      </div>
    </form>
  )
}

export default Popup;