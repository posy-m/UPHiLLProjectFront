
'use client'
import React, { useEffect } from 'react'
import { useInfiniteQuery } from '@tanstack/react-query';
import Ttext from '../components/Ttext'
import styled from './style.module.css'
import customAxios from '@/lib/customAxios';

// 받아오는 데이터 타입 정의
interface PurchaseItem {
  product: {
    name: string;
    price: number;
  }
}

interface PurchaseResponse {
  items: PurchaseItem[];
  hasMore: boolean; // 다음 페이지가 있는지 여부
}

const getPages = async ({ pageParam }: { pageParam?: any }): Promise<PurchaseResponse> => {
  try {
    const response = await customAxios.post(`/user/order`, {
      page: pageParam
    });
    if (response.status === 201) {
      console.log(response.data)
      return response.data; // 서버에서 반환한 데이터를 그대로 반환
    }
  } catch (error) {
    console.log(error);
  }
}

const useScrollEnd = (onScrollToEnd: () => void, hasNextPage: boolean) => {
  useEffect(() => {
    const handlerScroll = () => {
      console.log("스크롤");
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 200 && hasNextPage) {
        onScrollToEnd();
      }
    }
    window.addEventListener("scroll", handlerScroll);
    return () => {
      window.removeEventListener('scroll', handlerScroll);
    }
  }, [onScrollToEnd, hasNextPage]);
}

const PurchaseInfo = () => {
  const {
    data,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage
  } = useInfiniteQuery<PurchaseResponse>({
    queryFn: getPages,
    initialPageParam: 1,
    queryKey: ['pagination'],
    getNextPageParam: (lastPage: any) => {
      return lastPage?.hasMore ? (lastPage?.pages.length + 1) : undefined; // 페이지 번호 계산
    }
  });
  useScrollEnd(fetchNextPage, hasNextPage);

  return (
    <div className={styled.PurchaseInfoTop}>
      <div className={styled.Purinfostyle}>
        <Ttext className={styled.PurchaseInfoItem} onClick={() => { }}>- 품목 -</Ttext>
        <Ttext className={styled.PurchaseInfoDPoint} onClick={() => { }}>- 차감포인트 -</Ttext>
      </div>
      {data?.pages?.map((page: any, pageIndex) => {
        return page?.map((item: PurchaseItem, index: number) =>
          <div key={`${pageIndex}-${index}`} className={styled.purchaseitem}>
            <Ttext className='mr-4' onClick={() => { }}>{item.product.name}</Ttext>
            <Ttext className='ml-4' onClick={() => { }}>- {item.product.price} 포인트</Ttext>
          </div>
        )
      }
      )}

      {isFetchingNextPage && <p>더 불러오는 중...</p>}
    </div>
  );
};

export default PurchaseInfo;
