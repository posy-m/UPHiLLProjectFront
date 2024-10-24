'use client';

import { useEffect, useState } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import ProductListView from './ProductListView';
import Link from 'next/link';
import styled from './admin.module.css';
import styles from './product.user.module.css'
import { getAvatarPages, getProductPages } from '../../api';
import { UseUserScroll } from '../../hooks/useScroll';
import Header from '@/app/_components/header/header';
import Footerbar from '@/app/_components/footerbar/footerbar';
import customAxios from '@/lib/customAxios';
import { ProductScroll, ProductUserScroll } from '../../hooks/productScroll';

const User = () => {
  const [isPopup, setIsPopup] = useState<boolean>(false);
  const [modifyPopup, setModifyPopup] = useState<boolean>(false);
  const [productId, setProductId] = useState(0);
  const [dataLength, setDataLength] = useState(0);

  const dataCountAxios = async () => {
    const { data } = await customAxios.get('/shop/product/count');
    setDataLength(data);
  };



  // 최초의 한번 실행
  useEffect(() => {
    dataCountAxios();
  }, []);


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
  return (<>
    <Header showBackButton={false} />
    <div className={styles.avatar_wrap} >
      <div className={styles.avatar_content}>
        <ul className={styles.product_ul}>
          <li><Link href="https://uphillmountain.store/shop/avatar">아바타</Link></li>
          <li ><Link href="https://uphillmountain.store/shop/product">상품</Link></li>
        </ul>
        <ProductUserScroll fetchNextPage={fetchNextPage}
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
          data={data} >
          {data?.pages.map((page) => page?.map((e: any) => {
            return (
              <li className={styles.avatar_list} key={e.id}>
                <ProductListView product={e} refetch={refetch} />
              </li>)
          }))
          }
        </ProductUserScroll>
      </div>
    </div>
    <Footerbar />
  </>)
}

export default User;