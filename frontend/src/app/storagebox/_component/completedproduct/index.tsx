"use client"

import Image from 'next/image'
// import Footerbar from '../_components/footerbar/footerbar'
import styled from './used.module.css'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useAtom } from 'jotai';
import { userInfo } from '../../../(jotai)/atom'

import test from '../../../../../public/test.jpeg'


interface Product {
  id: number;
  imageUrl: string;
}

const CompletedProduct = ({ use }: { use: boolean }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [clickedImage, setClickedImage] = useState<string | null>(null)
  const [list, setList] = useState<Product[]>([])
  const [atom, setAtom] = useAtom(userInfo)


  //데이터 받아오기
  const getproduct = async () => {
    try {
      const response = await axios.get("http://localhost:3000/user/getproduct/", {
        params: {
          type: 'product',
          use
        }

      });
      const data = response.data
      setList(data)
    } catch (error) {
      console.error("used에서 에러", error)
    }
  }

  useEffect(() => {
    getproduct()
  }, [])



  return (<>
    <div className={styled.storge_box}>
      <span>사용 완료</span>
      <div className={styled.img_box}>
        {list.map((product) =>
          <Image key={product.id} src={product.imageUrl} width={300} height={500} alt='기프티콘' className={styled.customImage} />
        )}
        {/* <Image src={test} width={300} height={500} alt='기프티콘' className={styled.customImage} /> */}
      </div>
    </div>
  </>)
}

export default CompletedProduct