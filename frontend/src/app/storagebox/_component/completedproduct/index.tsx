"use client"
import React from 'react'
import Image from 'next/image'
// import Footerbar from '../_components/footerbar/footerbar'
import styled from './used.module.css'
import { useState } from 'react'

interface Product {
  id: number;
  image: string;
}

const CompletedProduct = ({ use }: { use: boolean }) => {

  const [list, setList] = useState<Product[]>([])

  return (<>
    <div className={styled.storge_box}>
      <div className={styled.img_box}>
        {list.map((product: Product) =>
          <Image key={product.id} src={`https://uphillmountain.store/back${product.image}`} width={300} height={500} alt='기프티콘' className={styled.customImage} />
        )}
      </div>
    </div>
  </>)
}

export default CompletedProduct