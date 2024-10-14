import { useEffect } from "react";

const useScrollEnd = (fetchNextPage: Function, hasNextPage: boolean, isFetchingNextPage: boolean, data: any ) => {
  useEffect(() => {
    const handlerScroll = async () => {
      
      if((window.innerHeight + window.scrollY >= document.body.offsetHeight) && hasNextPage){
        fetchNextPage();
      }
    }

    window.addEventListener('touchmove', handlerScroll);
    // window.addEventListener('scroll', handlerScroll);
    // PC scroll 조건문

    return () => {
      window.removeEventListener('touchmove', handlerScroll);
      // window.removeEventListener('scroll', handlerScroll);
      // PC Scroll
    }
  });
};

const useScroll = (fetchNextPage: Function, hasNextPage: boolean, isFetchingNextPage: boolean, data: any) => {
  useScrollEnd(fetchNextPage, hasNextPage,isFetchingNextPage, data);
};

export default useScroll;