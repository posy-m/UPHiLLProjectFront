import React, { useContext, useEffect } from 'react';
import styled from './userAvatarBuy.module.css';
import customAxios from '@/lib/customAxios';
import { Store } from './User';
import { useAtom } from 'jotai';
import { userInfo } from '@/app/(jotai)/atom';
// import UserAvatar from '../atom/UserAvatar';

const UserAvatarBuy = (props: {
  product: any,
  buyPopup: boolean,
  setBuyPopup: Function,
  orders?: object,
  status: string,
  refetch: Function
}) => {
  const [user, setUser] = useAtom(userInfo);

  const handleBuy = async (e: React.MouseEvent) => {

    if (parseInt(user.point) < parseInt(props.product.price)) {
      alert("보유하신 포인트가 부족합니다.");
      return;
    }
    const response = await customAxios.put(`/shop/product/buy`, {
      productId: props.product.id
    })
    console.log(response.status)
    if (response.status === 200) {
      props.setBuyPopup(false);
      setUser({ ...user, point: (parseInt(user.point) - props.product.price as number) + "" })
      props.refetch();
    }
    console.log(response);
  }

  const updateAvatar = async () => {
    try {
      const response = await customAxios.put("/shop/avatar/update", {
        productId: props.product.id
      });

      if (response.status === 200) {
        setUser((prev) => ({
          ...prev,
          image: props.product.image,
        }));
        props.setBuyPopup(false);
        props.refetch();
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
      return (<button className={styled.btn} onClick={updateAvatar}>착용</button>)
  }

  useEffect(() => {
    AcationButton();
  }, [])
  return (
    <div className={styled.user_avatarFrm}>
      <div className={styled.user_wear}>
        <div className={styled.user_label}>
          <img src={`https://uphillmountain.store/back${props.product.image}`} alt="현재착용중 아바타" />
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
