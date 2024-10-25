'use client'

import styled from './product.module.css'
import customAxios from '@/lib/customAxios';

const Product = ({ product, setProductId, modifyPopup, setModifyPopup, refetch }: { product: any, setProductId: Function, modifyPopup: boolean, setModifyPopup: Function, refetch: Function }) => {

  const handleDelete = async () => {
    try {
      if (!confirm('정말 삭제 하시겠습니까?')) return;

      const response = await customAxios.delete(`/shop/${product.id}`);
      if (response.status === 200) {
        refetch();
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className={styled.product_wrap}>
      <div className={styled.product_img}>
        <img src={`https://uphillmountain.store/back${product.image}`} />
      </div>
      <div className={styled.product_desc}>
        <span className={styled.product_title}>{product.name}</span>
        <span className={styled.product_price}>{product.price} P</span>
      </div>
      <div className={styled.product_btn}>
        <span onClick={() => { setModifyPopup(!modifyPopup); setProductId(product.id) }} className="button">수정</span>
        <span onClick={() => { handleDelete() }} className="button">삭제</span>
      </div>
    </div>
  )
}

export default Product;