'use client';

import { useEffect, useState } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
// import Avatar from './User';
import ProductListView from './ProductListView';
import Link from 'next/link';
// import AddBtn from './AddBtn';
// import Popup from './Popup';
// import Modify from './Modify';
import styled from './admin.module.css';
import styles from './product.user.module.css'
import { getAvatarPages } from '../../api';
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
    queryFn: getAvatarPages,
    initialPageParam: 1,
    getNextPageParam(lastPage, allPages) {
      // 페이지가 남아있으면 더 추가해주는 로직
      return allPages.length < Math.ceil(dataLength / 10) ? allPages.length + 1 : undefined;
    }
  });
  console.log(data)
  return (<>
    <Header showBackButton={false} />
    <div className={styles.avatar_wrap} >
      <div className={styles.avatar_content}>
        <ul className={styles.product_ul}>
          <li><Link href="http://127.0.0.1:3000/shop/avatar">아바타</Link></li>
          <li ><Link href="http://127.0.0.1:3000/shop/product">상품</Link></li>
        </ul>
        <ProductUserScroll fetchNextPage={fetchNextPage}
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
          data={data} >
          {data?.pages.map((page) => page.map((e: any) =>
            <li className={styles.avatar_list} key={e.id}>
              <ProductListView product={e} />
            </li>))
          }
        </ProductUserScroll>
      </div>
    </div>
    <Footerbar />
  </>)
}

export default User;