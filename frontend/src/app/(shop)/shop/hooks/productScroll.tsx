"use client"

import React, { useEffect, useRef } from "react";
import styled from './productScroll.module.css'


// 관리자 스크롤
export const ProductScroll = (props: any) => {
  // ul 높이값을 가져가기 위한 useRef 훅사용
  const divRef = useRef<HTMLDivElement | null>(null);
  const ulRef = useRef<HTMLUListElement | null>(null);

  // ul 태그가 있음면 조건문 실행
  useEffect(() => {
    const handlerScroll = () => {

      if (ulRef.current && divRef.current) {
        // 무한 스크롤 예시
        // console.log(divRef.current.offsetHeight + divRef.current.scrollTop >= ulRef.current.offsetHeight)
        if (divRef.current && (divRef.current.offsetHeight + divRef.current.scrollTop >= ulRef.current.offsetHeight) && props.hasNextPage) {
          props.fetchNextPage();
        }
      }
    }
    if (ulRef.current && divRef.current) {
      ulRef.current.addEventListener('touchmove', handlerScroll);
    }
    // // window.addEventListener('scroll', handlerScroll);
    // // PC scroll 조건문

    return () => {
      if (ulRef.current && divRef.current) {
        ulRef.current.removeEventListener('touchmove', handlerScroll);
      }
    }
  }, [props.hasNextPage, props.isFetchingNextPage])

  return (
    <div
      ref={divRef}
      style={{
        width: "330px",
        // height: "536px",
        margin: "0 auto",
        // overflowY: "scroll",
      }}>
      <ul ref={ulRef}
        style={{
          display: "flex",
          // flexDirection: "row",
          flexWrap: "wrap"
        }}>
        {props.children}
      </ul>
    </div>
  )
};


// 유저 스크롤
export const ProductUserScroll = (props: any) => {
  // ul 높이값을 가져가기 위한 useRef 훅사용
  const divRef = useRef<HTMLDivElement | null>(null);
  const ulRef = useRef<HTMLUListElement | null>(null);

  // // ul 태그가 있음면 조건문 실행
  useEffect(() => {
    const handlerScroll = () => {
      // console.log("dsfsdfsdfsdfsfdsfdsfsdf");
      if (ulRef.current && divRef.current) {
        // 무한 스크롤 예시
        // console.log(divRef.current.offsetHeight + divRef.current.scrollTop >= ulRef.current.offsetHeight)
        if ((divRef.current.offsetHeight + divRef.current.scrollTop >= ulRef.current.offsetHeight) && (props.hasNextPage)) {
          // console.log((divRef.current.offsetHeight + divRef.current.scrollTop >= ulRef.current.offsetHeight) && (props.hasNextPage))
          props.fetchNextPage();

          //props.fetchNextPage();
        }
        // if (divRef.current && (divRef.current.offsetHeight + divRef.current.scrollTop >= ulRef.current.offsetHeight) && props.hasNextPage) {
        //   props.fetchNextPage();
        //   console.log("dsfsdfsdfsdfsfdsfdsfsdf");
        // }

      }
    }
    if (ulRef.current && divRef.current) {
      ulRef.current.addEventListener('touchmove', handlerScroll);
    }
    //     // // window.addEventListener('scroll', handlerScroll);
    //     // // PC scroll 조건문

    return () => {
      if (ulRef.current && divRef.current) {
        ulRef.current.removeEventListener('touchmove', handlerScroll);
      }
    }
  }, [props.hasNextPage, props.isFetchingNextPage])

  return (
    <div ref={divRef} className={styled.userScrollBox}>
      <div className={styled.userScrollDiv}>
        <ul ref={ulRef}>
          {props.children}
        </ul>
      </div>
    </div >
  )
};