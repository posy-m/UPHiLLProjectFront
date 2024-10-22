
import customAxios from '@/lib/customAxios';

export const getAvatarPages = async ({pageParam}: {pageParam: number}) => {
  const {data} = await customAxios.get(`/shop/avatar`,
    {params: {
      page: pageParam,
    }}
  );
  
  return data;
}

export const getProductPages = async ({pageParam}: {pageParam: number}) => {
  const {data} = await customAxios.get(`/shop/product`,
    {params: {
      page: pageParam,
    }}
  );
  
  return data;
}