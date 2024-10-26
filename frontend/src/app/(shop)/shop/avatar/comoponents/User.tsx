'use client'

import React, { useEffect, useState } from 'react';
import styled from './user.module.css';
import UserAvatar from '../atom/UserAvatar';
import Header from '@/app/_components/header/header';
import Footerbar from '@/app/_components/footerbar/footerbar';
import { UseUserScroll } from '../../hooks/useScroll';
import Link from 'next/link';
import UserAvatarBuy from './UserAvatarBuy';
import customAxios from '@/lib/customAxios';
import { useInfiniteQuery } from '@tanstack/react-query';
import { getAvatarPages } from '../../api';
import AvatarCollector from '../atom/AvatarCollector';
// import { useContext } from 'react';
import { createContext } from 'react';
import getUserInfo from '@/lib/getUserInfo';
import { userInfo } from '@/app/(jotai)/atom';
import { useAtom } from 'jotai';


// 컨텍스트에서 사용할 데이터의 타입 정의
interface StoreContextProps {
  buyState: boolean;
  setBuyState: React.Dispatch<React.SetStateAction<boolean>>;
  wearState: boolean;
  setWearState: React.Dispatch<React.SetStateAction<boolean>>;
}

// 기본값 설정 (빈 함수와 기본 상태)
const defaultStoreContext: StoreContextProps = {
  buyState: false,
  setBuyState: () => { },  // 초기값은 빈 함수로 설정
  wearState: false,
  setWearState: () => { },  // 초기값은 빈 함수로 설정
};

export const Store = createContext<StoreContextProps>(defaultStoreContext);

export const User = () => {
  // const [nowAvatar, setNowAvatar] = useState(null);
  const [buyPopup, setBuyPopup] = useState<boolean>(false);
  const [user, setUser] = useAtom(userInfo);
  const [dataCount, setDataCount] = useState(0);
  const [buy, setBuy] = useState<Array<boolean>>();
  // const [productId, setProductId] = useState(0)

  const [buyState, setBuyState] = useState<boolean>(false);
  const [wearState, setWearState] = useState<boolean>(false);
  const [update, setUpdate] = useState<boolean>(false);

  // 전역 컨택스트
  const obj = {
    buyState, setBuyState, wearState, setWearState
  }

  const dataLength = async () => {
    const { data } = await customAxios.get('/shop/avatar/count');
    // console.log(data)
    setDataCount(data);
  };

  useEffect(() => {
    const getUser = async () => {
      const info = await getUserInfo();
      setUser(info);
    }
    getUser();
    dataLength();
    // console.log(dataLength)
  }, [])



  const {
    data,
    hasNextPage, // true
    fetchNextPage, // 다음페이지 ㅇㅇ
    isFetchingNextPage, // 로딩중인지 boolean
    refetch // 재요청,

  } = useInfiniteQuery({
    queryKey: ['infinitescroll'],
    queryFn: getAvatarPages,
    initialPageParam: 1,
    getNextPageParam(lastPage, allPages) {
      // 페이지가 남아있으면 더 추가해주는 로직
      return allPages.length < dataCount ? allPages.length + 1 : undefined;
    }
  });

  useEffect(() => {
    console.log(data);
    console.log(isFetchingNextPage);
  }, [data, isFetchingNextPage])

  console.log(data)

  return (
    <Store.Provider value={obj}>
      <Header showBackButton={false} />
      <div className={styled.user_avatar_wrap}>
        <ul className={styled.product_ul}>
          <li><Link href="https://uphillmountain.store/shop/avatar">아바타</Link></li>
          <li><Link href="https://uphillmountain.store/shop/product">상품</Link></li>
        </ul>
        <div className={styled.now_avatar}>
          <UserAvatar />
        </div>
        <UseUserScroll
          fetchNextPage={fetchNextPage}
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
          data={data}
        >
          {data?.pages.map((page) => page?.map((e: any) =>
            <li key={e.id} style={{ width: "150px" }}>
              <AvatarCollector product={e} refetch={refetch} />
            </li>))
          }
        </UseUserScroll>
      </div>
      <Footerbar />
    </Store.Provider>
  )
}