import React, { useContext, useEffect } from 'react';
import styled from './userAvatarBuy.module.css';
import customAxios from '@/lib/customAxios';
import { Store } from './User';
// import UserAvatar from '../atom/UserAvatar';

const UserAvatarBuy = (props: {
  product: any,
  buyPopup: boolean,
  setBuyPopup: Function,
  orders?: object,
  status: string
}) => {

  const handleBuy = async (e: React.MouseEvent) => {
    const response = await customAxios.put(`/shop/product/buy`, {
      productId: props.product.id
    })
    console.log(response);
  }

  const updateAvatar = async () => {
    try {

      console.log(props.product.id)
      const response = await customAxios.put("/shop/avatar/update", {
        productId: props.product.id
      });
      if (response.status === 200) {
        alert('변경되었습니다');
      }
    } catch (error) {
      alert("변경되지 못했습니다.");
      console.log(error)
    }
  }
  const AcationButton = () => {
    if (props.status === "판매중")
      return (<button className={styled.btn} onClick={handleBuy}>구입</button>)
    else if (props.status === "보유중")
      return (<button className={styled.btn} onClick={updateAvatar}>착용하기</button>)
  }

  useEffect(() => {
    AcationButton();
  }, [])
  return (
    <div className={styled.user_avatarFrm}>
      <div className={styled.user_wear}>
        <div className={styled.user_label}>
          <img src={`http://127.0.0.1:4000${props.product.image}`} alt="현재착용중 아바타" />
        </div>
      </div>
      <div className={styled.btn_area}>
        <AcationButton />
        <span className={styled.btn} onClick={() => { props.setBuyPopup(!props.buyPopup) }}>취소</span>
      </div>
    </div>
  );
}

export default UserAvatarBuy;
