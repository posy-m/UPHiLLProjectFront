'use client';

import React, { FormEventHandler, ReactNode, useEffect, useState } from 'react';
import styled from './popup.module.css';
import customAxios from '@/lib/customAxios';

const Modify = ({ modifyPopup, setModifyPopup, refetch, productId }: { setModifyPopup: Function, modifyPopup: boolean, productId: number, refetch: Function }) => {
  const [attachment, setAttachment] = useState<string | ArrayBuffer | null>();
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [imageState, setImageState] = useState("")

  // input change 발생시 상품 변화
  const handleChangeAvatar = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = () => {
        setAttachment(reader.result)
      }
    }
  }

  const detail = async () => {
    const response = await customAxios.get(`/shop/detail/${productId}`);
    console.log(response);
    if (response.status === 200) {
      const { data: { name, price, image } } = response;
      setName(name);
      setPrice(price)
      setImageState(image);
    }
  };

  useEffect(() => {
    detail()
  }, [])


  const handleModify = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // console.log(productId)

    const { name, price, image } = e.target as HTMLFormElement;
    const nameValue = (name as unknown as HTMLInputElement).value;
    const priceValue = Number((price as unknown as HTMLInputElement).value);

    console.log(nameValue)
    if (nameValue === "" || priceValue === 0) {
      alert("상품 이름과 가격을 입력해주세요.");
      return;
    }

    const formData = new FormData();
    if (!image.files[0]) {
      const response = await customAxios.put(`/shop/avatar`, { productId, name: nameValue, price: priceValue }
        , {
          headers: {
            'Content-Type': 'application/json'
          }
        })
      if (response.status === 200) {
        setModifyPopup(!modifyPopup);
        refetch();
      }
    } else {
      formData.append('image', image.files[0]);
      formData.append('name', name);
      formData.append('price', price);
      formData.append('productId', price);

      const response = await customAxios.put(`/shop/avatar`, formData
        , {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
      if (response.status === 201) {
        setModifyPopup(!modifyPopup);
        refetch();
      }
    }
  }
  const changeName = (e: any) => {
    setName(e.target.value)
  }
  const changePrice = (e: any) => {
    setPrice(e.target.value)
  }

  return (
    <form
      id="modifyFrm"
      className={styled.avatar_frm}
      onSubmit={handleModify}
    >
      <div className={styled.frm_wrap}>
        <span>{productId}</span>
        <div className={styled.avatar_img}>
          <label htmlFor='image'>상품 이미지
            {attachment && <img src={attachment.toString()} className={styled.avatar_upload} />}
            {imageState && <img src={imageState.toString()} className={styled.avatar_modify} />}
          </label>
          <input type="file" id="image" name="image" accept="image/*" onChange={handleChangeAvatar} />
        </div>
        <div className={styled.avatar_info}>
          <div>
            {/* <label htmlFor='name'>이름</label> : */}
            &nbsp;<input type="text" id="name" name="name" placeholder='상품 이름 입력' onChange={changeName} value={`${name}`} />
          </div>
          <div>
            {/* <label htmlFor='price'>가격</label> : */}
            &nbsp;<input type="number" id="price" name="price" placeholder='상품 가격 입력' onChange={changePrice} value={`${price}`} />
          </div>
          <p>상품를 수정하시겠습니까?</p>
          <div className={styled.btn_area}>
            <button id="submitBtn" className={styled.btn}>수정</button>
            <span id="cancelBtn" onClick={() => setModifyPopup(!modifyPopup)} className={styled.btn}>취소</span>
          </div>
        </div>
      </div>
    </form>
  )
}

export default Modify;