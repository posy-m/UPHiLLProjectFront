'use client';

import { useEffect, useState } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import Avatar from './AdminAvatar';
import Link from 'next/link';
import AddBtn from './AddBtn';
import Popup from './Popup';
import Modify from './Modify';
import styled from './admin.module.css';
import { getAvatarPages } from '../../api';
import { UseScroll } from '../../hooks/useScroll';
import Header from '@/app/_components/header/header';
import Footerbar from '@/app/_components/footerbar/footerbar';
import customAxios from '@/lib/customAxios';
import AddBox from './AddBox';

const Admin = () => {
  const [isPopup, setIsPopup] = useState<boolean>(false);
  const [modifyPopup, setModifyPopup] = useState<boolean>(false);
  const [productId, setProductId] = useState(0);
  const [dataLength, setDataLength] = useState(0);

  const dataCountAxios = async () => {
    const { data } = await customAxios.get('/shop/avatar/count');
    setDataLength(data);
  };

  // 최초의 한번 실행
  useEffect(() => {
    dataCountAxios();
  }, []);

  useEffect(() => {
    console.log(isPopup)
  }, [isPopup])

  const {
    data,
    hasNextPage, // true
    fetchNextPage, // 다음페이지 ㅇㅇ
    isFetchingNextPage, // 로딩중인지 boolean
    refetch // 재요청
  } = useInfiniteQuery({
    queryKey: ['infinitescroll'],
    queryFn: getAvatarPages,
    initialPageParam: 1,
    getNextPageParam(lastPage, allPages) {
      // 페이지가 남아있으면 더 추가해주는 로직
      // return allPages.length < dataLength ? allPages.length + 1 : undefined;
      return allPages.length < dataLength ? allPages.length + 1 : undefined;
    }
  });

  return (<>
    <Header showBackButton={false} />
    <div className={styled.avatar_wrap} >
      <div className={styled.avatar_content}>
        <ul className={styled.product_ul}>
          <li>아바타</li>
          <li><Link href="https://uphillmountain.store/shop/product">상품</Link></li>
        </ul>
        <UseScroll
          fetchNextPage={fetchNextPage}
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
          data={data}
        >
          <li className={styled.avatar_list}>
            <AddBox setIsPopup={setIsPopup} />
          </li>
          {data?.pages.map((page) => page?.map((e: any) =>
            <li className={styled.avatar_list} key={e.id}>
              <Avatar product={e} refetch={refetch} setProductId={setProductId} setModifyPopup={setModifyPopup} modifyPopup={modifyPopup} />
            </li>))
          }
        </UseScroll>
      </div>

      {isPopup ? <Popup refetch={refetch} isPopup={isPopup} setIsPopup={setIsPopup} /> : ''}
      {modifyPopup ? <Modify refetch={refetch} productId={productId} setModifyPopup={setModifyPopup} modifyPopup={modifyPopup} /> : ''}
    </div>
    <Footerbar />
  </>)
}

export default Admin;