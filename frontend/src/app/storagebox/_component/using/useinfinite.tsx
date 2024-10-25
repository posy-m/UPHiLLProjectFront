"use client"
// hooks/useInfiniteProducts.ts
import React from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import Image from 'next/image'
import styled from './storagebox.module.css'
import customAxios from '@/lib/customAxios';

const useScollEnd = (onScrollToEnd: any, isFetchingNextPage: boolean, data: any) => {
  useEffect(() => {
    const handlerScroll = () => {
      // console.log("될까?");
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        console.log(1234)
        onScrollToEnd()
      }
    }
    window.addEventListener("touchmove", handlerScroll)
    return () => {
      window.removeEventListener('touchmove', handlerScroll)
    }
  }, [useScollEnd])
}

const getPage = async ({ pageParam, use }: { pageParam: number, use: boolean }) => {
  const { data } = await customAxios.post("/shop/mybox/product", {
    page: pageParam,
    use: use
  })

  return data
}

interface Product {
  id: number;
  product: {
    image: string;
  }
}

const Scroll = ({ setIsModalOpen, setOrderProduct, setClickedImage, use }: { setIsModalOpen: Dispatch<SetStateAction<boolean>>, setOrderProduct: Dispatch<SetStateAction<number>>, setClickedImage: Dispatch<SetStateAction<string | null>>, use: boolean, }) => {
  // const [list, setList] = useState<Product[]>([])
  const [total, setTotal] = useState(0);
  const getTotalpage = async () => {
    try {

      const response = await customAxios.get("/shop/product/count");
      setTotal(response.data)
    } catch (error) {
      console.log("error")
    }
  }
  const {
    data,
    hasNextPage,
    fetchNextPage,
    isLoading,
    isFetchingNextPage,
    refetch
  } = useInfiniteQuery({
    queryKey: ['pagenation'],
    // queryFn: getPage,
    queryFn: ({ pageParam }) => getPage({ pageParam, use }),
    initialPageParam: 1,
    getNextPageParam(lastPage, allPages) {
      console.log(allPages.length < total)
      return allPages.length < total ? allPages.length + 1 : undefined
    }
  })
  useScollEnd(fetchNextPage, isFetchingNextPage, data)

  const enlargeImage = (src: string, id: number) => {
    setOrderProduct(id)
    setIsModalOpen(true);
    setClickedImage(src);
  }
  useEffect(() => {
    getTotalpage()
    // setObj(refetch)
  }, [])

  useEffect(() => {

    // console.log(data);
  }, [data])
  useEffect(() => {
    // console.log("ㄹ로딩중", isLoading);
  }, [isLoading])
  // console.log(data)

  const View = () => {
    if (data !== undefined) {
      // console.log("로딩완료", data)
      return (
        <>
          {data.pages.map((product: Product[]) => {
            if (!product) return (<></>)
            return product?.map((el: Product) => {
              return (<Image key={el.id} src={`https://uphillmountain.store/back${el.product.image}`} onClick={() => enlargeImage(`https://uphillmountain.store/back${el.product.image}`, el.id)} width={300} height={500} alt='기프티콘' className={styled.customImage} />)
            })
          })
          }
        </>
      )
    }
  }

  return (
    <div className={styled.storge_box}>
      <div className={styled.img_box}>
        <View />
      </div>
    </div>
  )
}

export default Scroll

