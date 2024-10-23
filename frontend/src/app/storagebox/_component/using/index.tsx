"use client"
import React from 'react'
import Image from 'next/image'
// import Footerbar from '../_components/footerbar/footerbar'
import styled from './storagebox.module.css'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useAtom } from 'jotai';
import { userInfo } from '../../../(jotai)/atom'
import test from '@/../../public/test.jpeg'
import { useInfiniteQuery } from '@tanstack/react-query'
import Scroll from './useinfinite'
import customAxios from '@/lib/customAxios'


interface Product {
  id: number;
  imageUrl: string;
}

const Using = ({ use }: { use: boolean }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [clickedImage, setClickedImage] = useState<string | null>(null)
  const [list, setList] = useState<Product[]>([])
  // const [use, setUse] = useState(false)
  // const [atom, setAtom] = useAtom(userInfo)
  const [orderProduct, setOrderProduct] = useState(0);
  // const [obj, setObj] = useState<object | null>(null);

  const enlargeImage = (src: string, id: number) => {
    setOrderProduct(id)
    setIsModalOpen(true);
    setClickedImage(src);
  }

  const closeModal = () => {
    setIsModalOpen(false);
    setClickedImage(null);
  }

  // //데이터 받아오기
  // const getproduct = async () => {
  //   try {
  //     const response = await axios.post("http://localhost:3000/user/getproduct/", {
  //       param: {
  //         type: 'product',
  //         use
  //       }
  //     });
  //     const data = response.data
  //     setList(data)
  //   } catch (error) {
  //     console.error("using에서 에러", error)
  //   }
  // }

  // useEffect(() => {
  //   getproduct()
  // }, [use])

  // 사용완료
  const useProductClick = async () => {
    try {
      console.log(orderProduct)
      const response = await customAxios.put("/shop/product/complete", {
        orderProduct
      })
      if (response.status === 200) {
        const data = response.data
        setList(data);
        // if (obj) {
        //   const fn = obj["fn"];
        //   fn();
        // }
      }
    } catch (error) {
      console.error(error, "모달 사용에서 에러");
    }
  }


  return (<>


    <Scroll setIsModalOpen={setIsModalOpen} setOrderProduct={setOrderProduct} setClickedImage={setClickedImage} use={use} />

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
        <button onClick={useProductClick}>사용</button>
      </div>
    )}
  </>)
}


export default Using