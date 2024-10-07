"use client"

import Image from 'next/image'
// import Footerbar from '../_components/footerbar/footerbar'
import styled from './storagebox.module.css'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useAtom } from 'jotai';
import { userInfo } from '../../../(jotai)/atom'


interface Product {
  id: number;
  imageUrl: string;
}

const Using = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [clickedImage, setClickedImage] = useState<string | null>(null)
  const [list, setList] = useState<Product[]>([])
  const [atom, setAtom] = useAtom(userInfo)

  const enlargeImage = (src: string) => {
    setIsModalOpen(true);
    setClickedImage(src);
  }

  const closeModal = () => {
    setIsModalOpen(false);
    setClickedImage(null);
  }

  //데이터 받아오기
  const getproduct = async () => {
    try {
      const response = await axios.get("http://localhost:3000/user/getproduct/" + atom.userId);
      const data = response.data
      setList(data)
    } catch (error) {
      console.error("보관함에서 에러", error)
    }
  }

  useEffect(() => {
    getproduct()
  }, [])



  return (<>
    <div className={styled.storge_box}>
      <span>구매한 상품</span>
      <div className={styled.img_box}>
        {list.map((product) =>
          <Image key={product.id} src={product.imageUrl} onClick={() => enlargeImage(product.imageUrl)} width={300} height={500} alt='기프티콘' className={styled.customImage} />
        )}
      </div>
    </div>

    {/* 모달 */}
    {isModalOpen && (
      <div className={styled.modalOverlay} onClick={closeModal}>
        <div className={styled.modalContent}>
          {clickedImage && (
            <Image
              src={clickedImage}
              alt="확대된 이미지"
              layout='fill'
              className={styled.enlargedImage}
            />
          )}
        </div>
        <button>사용</button>
      </div>
    )}
  </>)
}

export default Using