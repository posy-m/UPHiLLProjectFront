'use client';

import React, {ReactNode, useState} from 'react'
import styled from './popup.module.css'
import axios from 'axios';

const Modify = () => {
  const [attachment, setAttachment] = useState<string | ArrayBuffer | null>();

  // input change 발생시 아바타 변화
  // const handleChangeAvatar = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   if (e.target.files) {
  //     const file = e.target.files[0];
  //     const reader = new FileReader();
  //     reader.readAsDataURL(file);

  //     reader.onload = () => {
  //       setAttachment(reader.result)
  //     }
  //   }
  // }

  // input type 추가
  interface Mytype {
    name : string;
    price : number;
  }

  const handleModify = (e: SubmitEvent) => {
    const {name, price, image} = e.target as HTMLFormElement;

    const nameValue = (name as HTMLInputElement).value
    const priceValue = (price as HTMLInputElement).value


    // if(!image.files[0]){
    //   console.log("No image selectged");
    //   return;
    // }

    if (!nameValue || !priceValue){
      alert("아바타의 이름과 가격을 입력해주세요.");
      return;
    }

    // File 정보 
    const formData = new FormData();

    // formData.append('image', image.files[0]);
    formData.append('name', name.value);
    formData.append('price', price.value);
    
    axios.put('/shop/avatar', formData
    ,{
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      withCredentials: true
    }).then(response => {
      console.log("Avatar registed successfully", response);
    }).catch(error => {
      console.error("Error registered avatar", error);
    });
  }
  
  return (
   <form 
   id="modifyFrm" 
   className={styled.avatar_frm} 
   >
    <div className={styled.frm_wrap}>
      <div className={styled.avatar_img}>
        {/* <label htmlFor='image'>아바타 이미지 */}
        {/* {attachment && <img src={attachment.toString()} className={styled.avatar_upload} />} */}
        {/* </label> */}
        {/* <input type="file" id="image" name="image" accept="image/*" onChange={handleChangeAvatar}/> */}
      </div>
      <div className={styled.avatar_info}>
        <div>
          <label htmlFor='name'>이름</label> :
          &nbsp;<input type="text" id="name" name="name" placeholder='아바타 이름 입력' />
        </div>
        <div>
          <label htmlFor='price'>가격</label> :
          &nbsp;<input type="number" id="price" name="price" placeholder='아바타 가격 입력'/>
        </div>
        <p>아바타를 수정하시겠습니까?</p>
        <div className={styled.btn_area}>
          <button id="submitBtn" className={styled.btn} onClick={handleModify}>수정</button>
          <span id="cancelBtn" className={styled.btn}>취소</span>
        </div>
      </div>
    </div>
   </form>
  ) 
}

export default Modify;