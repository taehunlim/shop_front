import axios from 'axios';
import useSWR from 'swr';

import { ProductDataProps } from 'fixtures/products';

function fetcher(url: string) {
   return axios
      .get(url, {
         withCredentials: true,
      })
      .then((res) => res.data || []);
}

export default function useSearchProduct(keyword: string) {
   const { data, error, isLoading } = useSWR<ProductDataProps[]>(
      `/api/product/search/${keyword}`,
      fetcher,
      {
         revalidateOnFocus: false,
         revalidateOnReconnect: false,
      },
   );

   return {
      data: data || [],
      isLoading,
      isError: error,
   };
}
