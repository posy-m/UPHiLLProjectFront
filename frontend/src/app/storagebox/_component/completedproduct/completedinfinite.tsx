"use client"
import React from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react'
import Image from 'next/image'
import styled from './used.module.css'
import customAxios from '@/lib/customAxios';


const useScollEnd = (onScrollToEnd: any, isFetchingNextPage: boolean, data: any) => {
  useEffect(() => {
    const handlerScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
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
  try {
    const { data } = await customAxios.post('/shop/mybox/product', {

      page: pageParam,
      use

    })
    return data
  } catch (error) {
    console.error(error, 'Scroll에서 에러남')
  }
}

interface Product {
  id: number;
  product: {
    image: string
  }
}

// allpage


const CompletedInfinite = ({ use }: { use: boolean }) => {
  const [total, setTotal] = useState(0);
  const getTotalpage = async () => {
    const response = await customAxios.get("/shop/product/count");
    setTotal(response.data)
  }

  console.log(use)
  const {
    data,
    hasNextPage,
    fetchNextPage,
    isLoading,
    isFetchingNextPage
  } = useInfiniteQuery({
    queryKey: ['pagenation', use],
    // queryFn: getPage,
    queryFn: ({ pageParam }) => getPage({ pageParam, use }),
    initialPageParam: 1,
    getNextPageParam(lastPage, allPages) {
      return allPages.length < total ? allPages.length + 1 : undefined
    }
  })
  useScollEnd(fetchNextPage, isFetchingNextPage, data)
  console.log(data, "왜 안돼엥에에엥");

  useEffect(() => {
    getTotalpage()
  }, [])

  useEffect(() => {
    console.log(data, "가보자아아아앙ㅇ");
  }, [data])

  return (
    <div className={styled.storge_box}>
      {/* <span>사용 완료</span> */}
      <div className={styled.img_box}>
        {data?.pages.map((page: Product[]) =>
          page?.map((product: Product) => (
            <Image
              key={product.id}
              src={`https://uphillmountain.store/back${product.product.image}`}
              width={300}
              height={500}
              alt='사용완료 기프티콘'
              className={styled.customImage}
            />
          ))
        )}
      </div>
    </div>
  )
}

export default CompletedInfinite
