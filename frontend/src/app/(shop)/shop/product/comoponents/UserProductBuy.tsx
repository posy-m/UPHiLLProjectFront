import React, { useContext, useEffect, useState } from 'react';
import styled from '../../avatar/comoponents/userAvatarBuy.module.css';
//import styled from './userAvatarBuy.module.css';
import customAxios from '@/lib/customAxios';
import { useAtom } from 'jotai';
import { userInfo } from '@/app/(jotai)/atom';

const UserProductList = (props: {
    product: any,
    buyPopup: boolean,
    setBuyPopup: Function,
    image: string
}) => {
    const [user, setUser] = useAtom(userInfo);
    useEffect(() => { }, [props.image])
    const [product, setProduct] = useState({ price: 0 });

    useEffect(() => {
        const getProductInfo = async () => {
            const response = await customAxios.get(`shop/detail/${props.product}`);
            if (response.status === 200) {
                const { data } = response;
                setProduct(data);
            }
        }
        getProductInfo();
    }, [])
    const handleBuy = async () => {
        console.log(user, product, props.product)
        try {
            if (parseInt(user.point) < product.price) {
                alert("보유하신 포인트가 부족합니다");
                return;
            }
            const response = await customAxios.put(`/shop/product/buy`, {
                productId: props.product
            })
            if (response.status === 200) {
                setUser({ ...user, point: (parseInt(user.point) - parseInt(props.product.price)) + "" })
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
                    <img src={`https://uphillmountain.store/back${props.image}`} alt="상품이미지" />
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
