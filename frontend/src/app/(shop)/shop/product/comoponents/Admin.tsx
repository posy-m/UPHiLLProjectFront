'use client';
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
      return allPages.length < Math.ceil(dataLength / 10) ? allPages.length + 1 : undefined;
    }
  });

  // console.log(Math.ceil(dataLength / 10))

  return (
    <>
      <Header showBackButton={false} />
      <div className={styled.avatar_wrap}>
        <div className={styled.avatar_content}>
          <ul className={styled.product_ul}>
            <li ><Link href="http://127.0.0.1:3000/shop/avatar">아바타</Link></li>
            <li>상품</li>
          </ul>
          <ProductScroll
            fetchNextPage={fetchNextPage}
            hasNextPage={hasNextPage}
            isFetchingNextPage={isFetchingNextPage}
            data={data}
          >
            {data?.pages.map((page) => page.map((e: any) =>
              <li className={styled.avatar_list} key={e.id}>
                <Product productId={e.id} name={e.name} refetch={refetch} setProductId={setProductId} setModifyPopup={setModifyPopup} modifyPopup={modifyPopup} price={e.price} image={e.image} />
              </li>))
            }
          </ProductScroll>
        </div>
        <AddBtn isPopup={isPopup} setIsPopup={setIsPopup} modifyPopup={modifyPopup} />
        {isPopup ? <Popup refetch={refetch} isPopup={isPopup} setIsPopup={setIsPopup} /> : ''}
        {modifyPopup ? <Modify refetch={refetch} productId={productId} setModifyPopup={setModifyPopup} modifyPopup={modifyPopup} /> : ''}
        {modifyPopup ? <Modify refetch={refetch} productId={productId} setModifyPopup={setModifyPopup} modifyPopup={modifyPopup} /> : ''}
      </div>
      <Footerbar />
    </>
  )
}

export default Admin;