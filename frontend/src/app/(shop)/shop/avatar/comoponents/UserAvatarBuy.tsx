import React, { useContext } from 'react';
import styled from './userAvatarBuy.module.css';
import customAxios from '@/lib/customAxios';
import { Store } from './User';
// import UserAvatar from '../atom/UserAvatar';

const UserAvatarBuy = (props: {
  productId: number,
  buyPopup: boolean,
  setBuyPopup: Function
}) => {
  const {
    buyState,
    setBuyState,
    wearState,
    setWearState
  } = useContext(Store);

  const handleBuy = async (e: React.MouseEvent) => {


    const response = await customAxios.put(`/shop/product/buy`, {
      productId: props.productId
    })
    console.log(response);
  }

  return (
    <div className={styled.user_avatarFrm}>
      <div className={styled.user_wear}>
        <div className={styled.user_label}>
          <img src="" alt="현재착용중 아바타" />
        </div>
      </div>
      <div className={styled.btn_area}>
        <button className={styled.btn} onClick={handleBuy}>구입</button>
        <span className={styled.btn} onClick={() => { props.setBuyPopup(!props.buyPopup) }}>취소</span>
      </div>
    </div>
  );
}

export default UserAvatarBuy;
