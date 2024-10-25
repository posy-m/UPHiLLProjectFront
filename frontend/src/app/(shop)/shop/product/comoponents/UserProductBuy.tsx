import React, { useContext, useEffect } from 'react';
import styled from '../../avatar/comoponents/userAvatarBuy.module.css';
//import styled from './userAvatarBuy.module.css';
import customAxios from '@/lib/customAxios';

const UserProductList = (props: {
    product: any,
    buyPopup: boolean,
    setBuyPopup: Function,
    image: string
}) => {
    // console.log(props.product, "하이여어ㅓ어어")
    console.log("-----------------------")
    console.log(props.image)
    useEffect(() => { }, [props.image])
    const handleBuy = async () => {
        try {

            const response = await customAxios.put(`/shop/product/buy`, {
                productId: props.product
            })
            if (response.status === 200) {
                props.setBuyPopup(false);
            }
        } catch (error) {
            console.error(error)
        }
    }


    return (
        <div className={styled.user_avatarFrm}>
            <div className={styled.user_wear}>
                {props.product.id}
                <div className={styled.user_label}>
                    <img src={`https://uphillmountain.store/back/${props.image}`} alt="상품이미지" />
                </div>
            </div>
            <div className={styled.btn_area}>
                <button className={styled.btn} onClick={handleBuy}>구입</button>
                <span className={styled.btn} onClick={() => { props.setBuyPopup(!props.buyPopup) }}>취소</span>
            </div>
        </div>
    );
}

export default UserProductList;
