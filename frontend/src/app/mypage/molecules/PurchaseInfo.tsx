
'use client'
import React, { useEffect } from 'react'
import { useInfiniteQuery } from '@tanstack/react-query';
import Ttext from '../components/Ttext'
import styled from './style.module.css'
import customAxios from '@/lib/customAxios';

// 받아오는 데이터 타입 정의
interface PurchaseItem {
  item: string;
  pointsDeducted: number;
}

interface PurchaseResponse {
  items: PurchaseItem[];
  hasMore: boolean; // 다음 페이지가 있는지 여부
}

const getPages = async ({ pageParam }: { pageParam?: any }): Promise<PurchaseResponse> => {
  const response = await customAxios.get(`http://localhost:4000/page/${pageParam}`);
  return response.data; // 서버에서 반환한 데이터를 그대로 반환
}

const useScrollEnd = (onScrollToEnd: ()=>void, hasNextPage: boolean) => {
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
    getNextPageParam: (lastPage : any) => {
      return lastPage.hasMore ? (lastPage?.pages.length + 1) : undefined; // 페이지 번호 계산
    }
  });
  useScrollEnd(fetchNextPage, hasNextPage);

  return (
    <div className={styled.PurchaseInfoTop}>
      <div className={styled.Purinfostyle}>
        <Ttext className={styled.PurchaseInfoItem} onClick={()=>{}}>- 품목 -</Ttext>
        <Ttext className={styled.PurchaseInfoDPoint} onClick={()=>{}}>- 차감포인트 -</Ttext>
      </div>
      {data?.pages.map((page,pageIndex) =>
        page.items.map((item: PurchaseItem, index: number) => (
          <div key={`${pageIndex}-${index}`} className={styled.purchaseitem}>
            <Ttext className='mr-4' onClick={()=>{}}>{item.item}</Ttext>
            <Ttext className='ml-4' onClick={()=>{}}>- {item.pointsDeducted} 포인트</Ttext>
          </div>
        ))
      )}
      {isFetchingNextPage && <p>더 불러오는 중...</p>}
    </div>
  );
};

export default PurchaseInfo;
