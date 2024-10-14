'use client';

import {useEffect, useState} from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import Avatar from './comoponents/Avatar';
import Link from 'next/link';
import AddBtn from './comoponents/AddBtn';
import Popup from './comoponents/Popup';
import Modify from './comoponents/Modify';
import styled from './page.module.css';
import { getPages } from './api';
import useScroll from '../hooks/useScroll';

const Page = () => {

  const [isPopup, setIsPopup] = useState<boolean>(false);
  const [modifyPopup, setModifyPopup] = useState<boolean>(false);
  const [updated, setUpdate]=useState(false);
  const [productId, setProductId] = useState(0);
  // const [productName, setProductName] = useState("");
  // const [productPrice, setProductPrice] = useState(0);
 
  const {
    data,
    hasNextPage, // true
    fetchNextPage, // 다음페이지 ㅇㅇ
    isFetchingNextPage // 로딩중인지 boolean
  } = useInfiniteQuery({
    queryKey: ['infinitescroll'],
    queryFn: getPages,
    initialPageParam: 1,
    getNextPageParam(lastPage, allPages){
      return allPages.length < 3 ? allPages.length + 1 : undefined;
    }
  });

  const scroll = useScroll(fetchNextPage, hasNextPage, isFetchingNextPage, data);


  // 페이지 데이터 가져오고
  // console.log(data)
  // const dataAsync = async () => {
  //   try {
  //     const {data} = await axios.get("http://localhost:4000/shop/avatar");
  //     console.log("아바타 데이터가 잘 들어왔어", data);
      
  //     setAvatarArray(data)
  //   } catch (error) {
  //     console.log("아타를 못 불러왔어", error);
  //   }
  // }
  
  // 비동기 함수 최초의 한번만 실행할 hook
  // useEffect(() => {
  //   dataAsync();
  // }, [updated]);

  // useEffect(() => {

  // }, [data]);

  return (
      <div className={styled.avatar_wrap} onScroll={scroll as any} >
        <div className={styled.header}><h2>관리자 페이지</h2></div>
        <div className={styled.avatar_content}>
          <ul className={styled.product_ul}>
            <li style={{borderBottom:"3px solid rgb(112, 61, 22)", color: "rgb(112, 61, 22)"}}>아바타</li>
            <li><Link style={{width: "100%", height: '100%', display: 'flex', justifyContent: 'center'}} href="http://localhost:3000/shop/product">상품</Link></li>
          </ul>
          <ul className={styled.avatar_ul}>
            {data?.pages.map((page) => page.map((e:any) =>
              <li key={e.id}>
                <Avatar productId={e.id} updated={updated} setUP={setUpdate} setProductId={setProductId} setModifyPopup={setModifyPopup} modifyPopup={modifyPopup} price={e.price} image={e.image}/>
              </li>))
            } 
          </ul>
        </div>
        <AddBtn isPopup={isPopup} setIsPopup={setIsPopup} modifyPopup={modifyPopup}/>
        { isPopup ? <Popup isPopup={isPopup} setIsPopup={setIsPopup}/> : '' }
        { modifyPopup ? <Modify productId={productId} setModifyPopup={setModifyPopup} modifyPopup={modifyPopup}/> : '' }
      </div>
    )
  }

export default Page;