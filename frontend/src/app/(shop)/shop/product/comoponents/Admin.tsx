'use client';
import React from 'react';
import { useEffect, useState } from 'react'
import Link from 'next/link';
import AddBtn from './AddBtn';
import Popup from './Popup';
import { getProductPages } from '../../api';
import customAxios from '@/lib/customAxios';
import styled from './admin.module.css';
import Product from './Product';
import Modify from '../../avatar/comoponents/Modify';
import Header from '@/app/_components/header/header';
import Footerbar from '@/app/_components/footerbar/footerbar';
import { useInfiniteQuery } from '@tanstack/react-query';
import { UseUserScroll } from '../../hooks/useScroll';
import { ProductScroll } from '../../hooks/productScroll';
import AddBox from './AddBox';

const Admin = () => {
  const [isPopup, setIsPopup] = useState<boolean>(false);
  const [modifyPopup, setModifyPopup] = useState<boolean>(false);
  const [productId, setProductId] = useState(0);
  const [dataLength, setDataLength] = useState(0);

  const dataCountAxios = async () => {
    const { data } = await customAxios.get('/shop/product/count');
    setDataLength(data);
  };

  useEffect(() => {
    dataCountAxios();
  }, []);

  useEffect(() => {
    dataCountAxios();
  }, [dataLength]);

  const {
    data,
    hasNextPage, // true
    fetchNextPage, // 다음페이지 ㅇㅇ
    isFetchingNextPage, // 로딩중인지 boolean
    refetch // 재요청
  } = useInfiniteQuery({
    queryKey: ['infinitescroll'],
    queryFn: getProductPages,
    initialPageParam: 1,
    getNextPageParam(lastPage, allPages) {
      // 페이지가 남아있으면 더 추가해주는 로직
      // return allPages.length < Math.ceil(dataLength / 10) ? allPages.length + 1 : undefined;
      return allPages.length < dataLength ? allPages.length + 1 : undefined;
    }
  });

  // console.log(Math.ceil(dataLength / 10))

  return (
    <>
      <Header showBackButton={false} />
      <div className={styled.avatar_wrap}>
        <div className={styled.avatar_content}>
          <ul className={styled.product_ul}>
            <li ><Link href="https://uphillmountain.store/shop/avatar">아바타</Link></li>
            <li>상품</li>
          </ul>
          <ProductScroll
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
                <Product product={e} refetch={refetch} setProductId={setProductId} setModifyPopup={setModifyPopup} modifyPopup={modifyPopup} />
              </li>))
            }
          </ProductScroll>
        </div>

        {isPopup ? <Popup refetch={refetch} isPopup={isPopup} setIsPopup={setIsPopup} /> : ''}
        {modifyPopup ? <Modify refetch={refetch} productId={productId} setModifyPopup={setModifyPopup} modifyPopup={modifyPopup} /> : ''}
        {/* {modifyPopup ? <Modify refetch={refetch} productId={productId} setModifyPopup={setModifyPopup} modifyPopup={modifyPopup} /> : ''} */}
      </div>
      <Footerbar />
    </>
  )
}

export default Admin;