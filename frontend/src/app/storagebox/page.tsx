"use client"

import Image from 'next/image'
import Footerbar from '../_components/footerbar/footerbar'
import styled from './storagebox.module.css'
import { useEffect, useState } from 'react'

const Storagebox = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [clickedImage, setClickedImage] = useState<string | null>(null)

  const enlargeImage = (src: string) => {
    setClickedImage(src);
    setIsModalOpen(true);
  }

  const closeModal = () => {
    setIsModalOpen(false);
    setClickedImage(null);
  }

  const coverBox = () => {

  }



  return (<>
    <div className={styled.storge_box}>
      <span>구매한 상품</span>
      <div className={styled.img_box}>
        <Image src="/test.jpeg" onClick={() => enlargeImage('/test.jpeg')} width={300} height={500} alt='요섭이사진' className={styled.customImage} />
        {/* <Image src="/test.jpeg" width={300} height={500} alt='요섭이사진' className={styled.customImage} /> */}
        {/* <Image src="/test.jpeg" alt='요섭이사진' layout='fill' objectFit='contain' /> */}
        {/* <Image src="/test.jpeg" width={30} height={30} alt='요섭이사진' /> */}
      </div>
    </div>

    {/* 모달 */}
    {isModalOpen && (
      <div className={styled.modalOverlay} onClick={closeModal}>
        <div className={styled.modalContent}>
          {clickedImage && (
            <Image
              // width={300} height={500}
              src={clickedImage} alt="확대된 이미지"
              fill
              className={styled.enlargedImage}
            />
          )}
        </div>
        <button onClick={coverBox}>사용</button>
      </div>
    )}
    <Footerbar />
  </>)
}

export default Storagebox