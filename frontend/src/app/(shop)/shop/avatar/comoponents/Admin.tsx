'use client';

import {useEffect, useState} from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import Avatar from './AdminAvatar';
import Link from 'next/link';
import AddBtn from './AddBtn';
import Popup from './Popup';
import Modify from './Modify';
import styled from './admin.module.css';
import { getAvatarPages } from '../../api';
import {UseScroll} from '../../hooks/useScroll';
import Header from '@/app/_components/header/header';
import Footerbar from '@/app/_components/footerbar/footerbar';
import customAxios from '@/lib/customAxios';

const Admin = () => {
  const [isPopup, setIsPopup] = useState<boolean>(false);
  const [modifyPopup, setModifyPopup] = useState<boolean>(false);
  const [updated, setUpdate] = useState(false);
  const [productId, setProductId] = useState(0);
  const [dataLength, setDataLength] = useState(0);

  const dataCountAxios = async () => {
    const {data} = await customAxios.get('/shop/avatar/count');
    setDataLength(data);
  };

  
  // 최초의 한번 실행
  useEffect(() => {
    dataCountAxios();
  }, []);

  useEffect(() => {
    dataCountAxios();
  }, [updated]);

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
    getNextPageParam(lastPage, allPages){
      // 페이지가 남아있으면 더 추가해주는 로직
      return allPages.length < Math.ceil(dataLength / 12) ? allPages.length + 1 : undefined;
    }
  });

  return (<>
      <Header showBackButton={false} />
      <div className={styled.avatar_wrap} >
        <div className={styled.avatar_content}>
          <ul className={styled.product_ul}>
            <li style={{borderBottom:"3px solid rgb(112, 61, 22)", color: "rgb(112, 61, 22)", boxSizing: "border-box"}}>아바타</li>
            <li><Link style={{width: "100%", height: '100%', display: 'flex', justifyContent: 'center'}} href="http://localhost:3000/shop/product">상품</Link></li>
          </ul>
          <UseScroll
            fetchNextPage={fetchNextPage} 
            hasNextPage={hasNextPage} 
            isFetchingNextPage={isFetchingNextPage} 
            data={data}
            >
            {data?.pages.map((page) => page.map((e:any) =>
              <li className={styled.avatar_list} key={e.id}>
                <Avatar productId={e.id} refetch={refetch} setProductId={setProductId} setModifyPopup={setModifyPopup} modifyPopup={modifyPopup} price={e.price} image={e.image}/>
              </li>))
            } 
          </UseScroll>
        </div>
        <AddBtn isPopup={isPopup} setIsPopup={setIsPopup} modifyPopup={modifyPopup}/>
        { isPopup ? <Popup refetch={refetch} isPopup={isPopup} setIsPopup={setIsPopup}/> : '' }
        { modifyPopup ? <Modify refetch={refetch} productId={productId} setModifyPopup={setModifyPopup} modifyPopup={modifyPopup}/> : '' }
      </div>
      <Footerbar />
  </>)
  }

export default Admin;