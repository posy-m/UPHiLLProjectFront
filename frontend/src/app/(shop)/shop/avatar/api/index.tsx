import axios from 'axios'

export const getPages = async ({pageParam}: {pageParam: number}) => {
  const {data} = await axios.get(`http://localhost:4000/shop/avatar/${pageParam}`);

  return data;
}