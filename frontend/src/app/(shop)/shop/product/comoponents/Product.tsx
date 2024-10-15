'use client'

import styled from './product.module.css'
import customAxios from '@/lib/customAxios';

const Product = ({setProductId, productId, modifyPopup, setModifyPopup, name, price, image, refetch}: {setProductId:Function,productId: number, modifyPopup: boolean,setModifyPopup: Function, name: string, price: number, image:string, refetch: Function}) => {

  const handleDelete = (key:number) => {
    const deleteQuestion = confirm('정말 삭제 하시겠습니까?');
    // 삭제가 취소되면 실행되는 로직
    if(!deleteQuestion){
      console.log('삭제가 취소 됐습니다.');
      return;
    }

    customAxios.delete(`/shop/${key}`).then(response => {
      console.log("아바타가 삭제 됐습니다.", response);
      refetch();
    }).catch(error => console.log("아바타 삭제 가 실패", error));
  }

  return (
    <div className={styled.product_wrap}>
      <div className={styled.product_img}>
        <img src={`http://localhost:4000/${image}`} />
      </div>
      <div className={styled.product_desc}>
        <span className={styled.product_title}>{name}</span>
        <span className={styled.product_price}>{price}원</span>
      </div>
      <div className={styled.product_btn}>
        <span onClick={() => {setModifyPopup(!modifyPopup); setProductId(productId)}} className="button">수정</span>
        <span onClick={()=>{handleDelete(productId)}} className="button">삭제</span>
      </div>
    </div>
  )
}

export default Product;