
import customAxios from '@/lib/customAxios';

export const getAvatarPages = async ({ pageParam }: { pageParam: number }) => {
  const { data } = await customAxios.post(`/shop/avatar/get`,
    {
      page: pageParam,
    }
  );

  return data;
}

export const getProductPages = async ({ pageParam }: { pageParam: number }) => {
  const { data } = await customAxios.post(`/shop/product/get`,
    {
      page: pageParam,
    }
  );

  return data;
}