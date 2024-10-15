// 'use client'
// import React, { useEffect, useState } from 'react'
// import { useInfiniteQuery } from '@tanstack/react-query';
// import axios from 'axios';
// import Ttext from '../components/Ttext'
// import styled from './style.module.css'

// const useScollEnd = (onScrollToEnd: any, isFetchingNextPage: boolean, data: any) => {
//   useEffect(() => {
//     const handlerScroll = () => {
//       console.log("되나영");
//       if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
//         onScrollToEnd()
//       }
//     }
//     window.addEventListener("scroll", handlerScroll)
//     return () => {
//       window.removeEventListener('scroll', handlerScroll)
//     }
//   }, [useScollEnd])
// }

// export const getPages = async ({pageParam}:{pageParam:number}) =>{
//   console.log("hhh",pageParam);
  
//   const {data} = await axios.get(`http://localhost:4000/page/${pageParam}`)
//   return data
// }


// // 받아오는 데이터 타입 정의
// interface PurchaseItem {
//   item: string;
//   pointsDeducted: number;
// }
// console.log(1)
// interface PurchaseResponse {
//   items: PurchaseItem[];
//   hasMore: boolean; // 다음 페이지가 있는지 여부
// }

// // // 더미 데이터를 API에서 받아온다고 가정
// // const fetchPurchaseData = async ({ pageParam = 1 }): Promise<PurchaseResponse> => {
// //   const { data } = await axios.get(`/api/purchase?page=${pageParam}`);
// //   return data;
// // };

// // 더미 데이터
// const dummyData: PurchaseItem[] = [
//   { item: '아바타 1', pointsDeducted: 200 },
//   { item: '아바타 2', pointsDeducted: 300 },
//   { item: '기프티콘 커피', pointsDeducted: 300 },
//   { item: '기프티콘 커피', pointsDeducted: 150 },
//   { item: '기프티콘 커피', pointsDeducted: 150 },
//   { item: '기프티콘 커피', pointsDeducted: 150 },
//   // 더 많은 데이터 추가 가능
// ];

// // 더미 데이터를 페이지 단위로 나누는 함수
// const getDummyData = (page: number, pageSize: number): PurchaseResponse => {
//   const start = (page - 1) * pageSize;
//   const items = dummyData.slice(start, start + pageSize);

//   return {
//     items,
//     hasMore: items.length === pageSize // 페이지에 데이터가 있을 경우 true
//   };
// };

// const PurchaseInfo = () => {
//   // const [items,setItems] =useState(dummyData.slice(0,2)) // 처음에 2개만 보여줌
//   // const [hasMore,setHasMore] = useState(true)

//   // const loadMore = () => {
//   //   if (items.length >= dummyData.length) {
//   //     setHasMore(false); // 데이터가 없으면 false로 바꿔서 로딩 종료
//   //     return
//   //   }
//   //   const nextItems = dummyData.slice(items.length, items.length + 2);// 2개씩 추가
//   //     setItems((prevItems)=>[...prevItems,...nextItems])

// console.log(2)


// const {
//   data,
//   hasNextPage,
//   fetchNextPage,
//   isLoading,
//   isFetchingNextPage
// } = useInfiniteQuery({
//   queryKey: ['pagenation'],
//   queryFn: getPages,
//   initialPageParam: 1,
//   getNextPageParam(lastPage, allPages) {
//     return allPages.length < 12 ? allPages.length + 1 : undefined
//   }
// })
// useScollEnd(fetchNextPage, isFetchingNextPage, data)
// console.log(data, "왜 안돼엥에에엥");


// useEffect(() => {
//   console.log(data, "가보자아아아앙ㅇ");
// }, [data])

//   // const {
//   //   data,
//   //   fetchNextPage, // 다음 페이지 데이터 요청하는 함수
//   //   hasNextPage,   // 다음 페이지가 있는지 여부
//   //   isFetchingNextPage, // 다음 페이지 로딩 중인지 여부
//   // // } = useInfiniteQuery<PurchaseResponse>('purchaseData', fetchPurchaseData, {
//   // } = useInfiniteQuery<PurchaseResponse, Error>('purchaseData', 
//   //   ({ pageParam = 1 }) => getDummyData(pageParam, 2),{
//   //   // return getDummyData(pageParam, 2); // 페이지당 2개 데이터
//   //   getNextPageParam: (lastPage) => lastPage.hasMore ? lastPage.items.length / 2 + 1 : undefined,
//   // })

//   console.log(3)
//   // , {
//     // getNextPageParam: (lastPage) => {
//     //       // 다음 페이지가 있는지 확인
//     //       return lastPage.hasMore ? (lastPage.items.length / 2 + 1 ): undefined; // 다음 페이지 번호
//     //     },
//     //   });
//   //     // 다음 페이지 번호를 계산 (예시로 page 번호 반환)
//   //     if (lastPage.hasMore) {
//   //       return lastPage.items.length + 1; // 페이지 번호 반환
//   //     }
//   //     return undefined; // 다음 페이지가 없으면 undefined
//   //   }, 
//   // });
  


//   useEffect(()=>{
//     //스크롤 이벤트 추가
//     const scrollHandle = () =>{
//       if(
//         window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 200 &&  hasNextPage
//       ){
//         // loadMore(); // 스크롤이 하단에 도달하면 데이터 추가
//         fetchNextPage(); // 스크롤이 하단에 도달하면 데이터 추가
//       }
//     }

//     window.addEventListener('scroll',scrollHandle)
//     return () => window.removeEventListener('scroll',scrollHandle)
//   },[hasNextPage, fetchNextPage])

//   return (
//     <div style={{minHeight:'100vh'}}>
//       <div className={styled.Purinfostyle}>
//       <Ttext spanchild='mr-4' onClick={()=>{}}>품목</Ttext>
//       <Ttext spanchild='ml-4' onClick={()=>{}}>차감포인트</Ttext>
//       </div>
//       {data?.pages.map((page) =>
//         page.items.map((item:PurchaseItem, index:number) => (
//         <div key={index} className={styled.purchaseitem}>
//         <Ttext spanchild='mr-4' onClick={()=>{}}>{item.item}</Ttext>
//         <Ttext spanchild='ml-4' onClick={()=>{}}>- {item.pointsDeducted} 포인트</Ttext>
//         </div>
//         ))
//       )}
//       {isFetchingNextPage && <p>더 불러오는 중...</p>}
//     </div>
//   );
// };

// export default PurchaseInfo













'use client'
import React, { useEffect } from 'react'
import { useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';
import Ttext from '../components/Ttext'
import styled from './style.module.css'


// 더미 데이터 생성
const dummyData = Array.from({ length: 50 }, (_, index) => ({
  item: `아이템 ${index + 1}`,
  pointsDeducted: Math.floor(Math.random() * 500) + 100, // 100~600 사이의 랜덤 포인트
}));

const getPages = async ({ pageParam = 1 }: { pageParam: number }) => {
  const pageSize = 10; // 페이지당 데이터 수
  const start = (pageParam - 1) * pageSize;
  const items = dummyData.slice(start, start + pageSize);

  return {
    items,
    hasMore: start + pageSize < dummyData.length, // 다음 페이지가 있는지 여부
  };
};
// 더미 데이터 생성 여기까지



const useScrollEnd = (onScrollToEnd: any, hasNextPage: boolean) => {
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

// 서버 
// export const getPages = async ({ pageParam }: { pageParam: number }) => {
//   const { data } = await axios.get(`http://localhost:4000/page/${pageParam}`);
//   return data;
// }

// 받아오는 데이터 타입 정의
interface PurchaseItem {
  item: string;
  pointsDeducted: number;
}

interface PurchaseResponse {
  items: PurchaseItem[];
  hasMore: boolean; // 다음 페이지가 있는지 여부
}

const PurchaseInfo = () => {
  const {
    data,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage
  } = useInfiniteQuery({
    queryKey: ['pagination'],
    queryFn: getPages,
    initialPageParam: 1,
    // getNextPageParam(lastPage, allPages) {
    //   return lastPage.hasMore ? allPages.length + 1 : undefined;
    // }

  
        // 더미데이터 이용코드
        getNextPageParam(lastPage,allPages) {
          return lastPage.hasMore ? allPages.length + 1 : undefined; // 페이지 번호 계산
        }

  });
  useScrollEnd(fetchNextPage, hasNextPage);

  return (
    <div style={{ minHeight: '100vh' }}>
      <div className={styled.Purinfostyle}>
        <Ttext spanchild='mr-4' onClick={()=>{}}>품목</Ttext>
        <Ttext spanchild='ml-4' onClick={()=>{}}>차감포인트</Ttext>
      </div>
      {data?.pages.map((page) =>
        page.items.map((item: PurchaseItem, index: number) => (
          <div key={index} className={styled.purchaseitem}>
            <Ttext spanchild='mr-4' onClick={()=>{}}>{item.item}</Ttext>
            <Ttext spanchild='ml-4' onClick={()=>{}}>- {item.pointsDeducted} 포인트</Ttext>
          </div>
        ))
      )}
      {isFetchingNextPage && <p>더 불러오는 중...</p>}
    </div>
  );
};

export default PurchaseInfo;
