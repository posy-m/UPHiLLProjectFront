'use client';

import {useEffect, useState} from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import Avatar from './AdminAvatar';
import Link from 'next/link';
import AddBtn from './AddBtn';
import Popup from './Popup';
import Modify from './Modify';
import styled from './admin.module.css';
import { getPages } from '../api';
import {UseScroll} from '../../hooks/UseScroll';
import Header from '@/app/_components/header/header';
import Footerbar from '@/app/_components/footerbar/footerbar';

const Admin = () => {

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
      
      // 페이지가 남아있으면 더 추가해주는 로직
      return allPages.length < 3 ? allPages.length + 1 : undefined;
    }
  });

  // const scroll = UseScroll(fetchNextPage, hasNextPage, isFetchingNextPage, data);

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
                <Avatar productId={e.id} updated={updated} setUP={setUpdate} setProductId={setProductId} setModifyPopup={setModifyPopup} modifyPopup={modifyPopup} price={e.price} image={e.image}/>
              </li>))
            } 
          </UseScroll>
        </div>
        <AddBtn isPopup={isPopup} setIsPopup={setIsPopup} modifyPopup={modifyPopup}/>
        { isPopup ? <Popup isPopup={isPopup} setIsPopup={setIsPopup}/> : '' }
        { modifyPopup ? <Modify productId={productId} setModifyPopup={setModifyPopup} modifyPopup={modifyPopup}/> : '' }
      </div>
      <Footerbar />
  </>)
  }

export default Admin;