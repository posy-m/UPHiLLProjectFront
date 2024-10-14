import React ,{ useEffect, useRef } from "react";


// 관리자 스크롤
export const UseScroll = (props:any) => {
  // ul 높이값을 가져가기 위한 useRef 훅사용
  const divRef = useRef<HTMLDivElement | null>(null);
  const ulRef = useRef<HTMLUListElement | null>(null);

  // ul 태그가 있음면 조건문 실행
  useEffect(() => {
      const handlerScroll = () => {

        if(ulRef.current && divRef.current){
          // 무한 스크롤 예시

          console.log(divRef.current.offsetHeight + divRef.current.scrollTop >= ulRef.current.offsetHeight)
          if (
            (divRef.current.offsetHeight + divRef.current.scrollTop >= ulRef.current.offsetHeight)&&(props.hasNextPage)
          ){
            props.fetchNextPage();
          }
        }
      }
      if(ulRef.current && divRef.current){
        ulRef.current.addEventListener('touchmove', handlerScroll);
      }
      // // window.addEventListener('scroll', handlerScroll);
      // // PC scroll 조건문

      return () => {
        if(ulRef.current && divRef.current){
          ulRef.current.removeEventListener('touchmove', handlerScroll);
        }
      }
    })

  return(
    <div 
      ref={divRef}
      style={{
      width: "330px",
      height: "536px",
      margin:"0 auto",
      overflowY: "scroll",
    }}>
      <ul ref={ulRef} style={{display: "flex",
        flexDirection: "row",
        flexWrap: "wrap"}}> {/* overflowHidden 목적 자식 태그 li의 float:left 로 인해 부모인 ul의 높이가 사라짐을 방지 */}
        {props.children}
      </ul>
    </div>
  )
};


// 유저 스크롤
export const UseUserScroll = (props:any) => {
  // ul 높이값을 가져가기 위한 useRef 훅사용
  const divRef = useRef<HTMLDivElement | null>(null);
  const ulRef = useRef<HTMLUListElement | null>(null);

  // // ul 태그가 있음면 조건문 실행
  // useEffect(() => {
  //     const handlerScroll = () => {

  //       if(ulRef.current && divRef.current){
  //         // 무한 스크롤 예시

  //         console.log(divRef.current.offsetHeight + divRef.current.scrollTop >= ulRef.current.offsetHeight)
  //         if (
  //           (divRef.current.offsetHeight + divRef.current.scrollTop >= ulRef.current.offsetHeight)&&(props.hasNextPage)
  //         ){
  //           props.fetchNextPage();
  //         }
  //       }
  //     }
  //     if(ulRef.current && divRef.current){
  //       ulRef.current.addEventListener('touchmove', handlerScroll);
  //     }
  //     // // window.addEventListener('scroll', handlerScroll);
  //     // // PC scroll 조건문

  //     return () => {
  //       if(ulRef.current && divRef.current){
  //         ulRef.current.removeEventListener('touchmove', handlerScroll);
  //       }
  //     }
  //   })

  return(
    <>
      <div 
        ref={divRef}
        style={{
          width: "100%",
          height: "350px",
          display: "flex",
          justifyContent:"center",
          overflowY: "scroll",
      }}>
        <ul ref={ulRef} style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "row",
          flexWrap: "wrap",
          width: "300px",
          height: "max-content"
          }}>
          {props.children}
        </ul>
      </div>
    </>
  )
};