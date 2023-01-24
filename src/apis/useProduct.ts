import axios from 'axios';
import useSWR from 'swr';

import { products } from 'fixtures/products';

export type ProductDataProps = typeof products[0];

function fetcher(url: string) {
   return axios
      .get(url, {
         withCredentials: true,
      })
      .then((res) => res.data || []);
}

export default function useProduct() {
   const { data, error, isLoading } = useSWR<ProductDataProps[]>(
      '/api/product',
      fetcher,
   );
   return {
      data: data || [],
      isLoading,
      isError: error,
   };
}
