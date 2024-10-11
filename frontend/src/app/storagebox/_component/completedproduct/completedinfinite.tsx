import { useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useEffect } from 'react'
import Image from 'next/image'
import styled from './used.module.css'

const useScollEnd = (onScrollToEnd: any, isFetchingNextPage: boolean, data: any) => {
  useEffect(() => {
    const handlerScroll = () => {
      console.log("되나영");
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        onScrollToEnd()
      }
    }
    window.addEventListener("scroll", handlerScroll)
    return () => {
      window.removeEventListener('scroll', handlerScroll)
    }
  }, [useScollEnd])
}

const getPage = async ({ pageParam, use }: { pageParam: number, use: boolean }) => {
  try {
    const { data } = await axios.get('http://localhost:4000/user/getproduct', {
      params: {
        page: pageParam,
        use
      }
    })
    return data
  } catch (error) {
    console.error(error, 'Scroll에서 에러남')
  }
}

interface Product {
  id: number;
  imageUrl: string
}


const CompletedInfinite = ({ use }: { use: boolean }) => {
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
      return allPages.length < 12 ? allPages.length + 1 : undefined
    }
  })
  useScollEnd(fetchNextPage, isFetchingNextPage, data)
  console.log(data, "왜 안돼엥에에엥");


  useEffect(() => {
    console.log(data, "가보자아아아앙ㅇ");
  }, [data])

  return (
    <div className={styled.storge_box}>
      {/* <span>사용 완료</span> */}
      <div className={styled.img_box}>
        {data?.pages.map((page: Product[]) =>
          page.map((product: Product) => (
            <Image
              key={product.id}
              src={product.imageUrl}
              width={300}
              height={500}
              alt='사용완료 기프티콘'
              className={styled.customImage}
            />
          ))
        )}

        {/* <Image src={test} width={300} height={500} alt='기프티콘' className={styled.customImage} /> */}
      </div>
    </div>
  )
}

export default CompletedInfinite
