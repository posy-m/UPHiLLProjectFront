// hooks/useInfiniteProducts.ts
import { useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import Image from 'next/image'
import styled from './storagebox.module.css'

const useScollEnd = (onScrollToEnd: any, isFetchingNextPage: boolean, data: any) => {
  useEffect(() => {
    const handlerScroll = () => {
      // console.log("될까?");
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

const getPage = async ({ pageParam }: { pageParam: number }) => {
  const { data } = await axios.get(`http://localhost:3000/user/getproduct/`, {
    params: {
      page: pageParam
    }
  })
  // console.log(data)
  return data
}

interface Product {
  id: number;
  imageUrl: string;
}

const Scroll = ({ setIsModalOpen, setOrderProduct, setClickedImage }: { setIsModalOpen: Dispatch<SetStateAction<boolean>>, setOrderProduct: Dispatch<SetStateAction<number>>, setClickedImage: Dispatch<SetStateAction<string | null>> }) => {
  // const [list, setList] = useState<Product[]>([])
  const {
    data,
    hasNextPage,
    fetchNextPage,
    isLoading,
    isFetchingNextPage
  } = useInfiniteQuery({
    queryKey: ['pagenation'],
    queryFn: getPage,
    initialPageParam: 1,
    getNextPageParam(lastPage, allPages) {
      return allPages.length < 12 ? allPages.length + 1 : undefined
    }
  })
  useScollEnd(fetchNextPage, isFetchingNextPage, data)

  const enlargeImage = (src: string, id: number) => {
    setOrderProduct(id)
    setIsModalOpen(true);
    setClickedImage(src);
  }
  useEffect(() => {

    // console.log(data);
  }, [data])
  useEffect(() => {
    // console.log("ㄹ로딩중", isLoading);
  }, [isLoading])
  // console.log(data)

  const View = () => {
    if (data != undefined) {
      // console.log("로딩완료", data)
      return (
        <>
          {data.pages.map((product: Product[]) => product.map((el) => { return (<Image key={el.id} src={el.imageUrl} onClick={() => enlargeImage(el.imageUrl, el.id)} width={300} height={500} alt='기프티콘' className={styled.customImage} />) }))
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

