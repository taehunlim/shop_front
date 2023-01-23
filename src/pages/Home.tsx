import React from 'react';
import axios from 'axios';
import useSWR from 'swr';

import Layout from 'components/templates/Layout';
import Banner from 'components/organisms/Banner';
import HoverBanner from 'components/organisms/HoverBanner';
import ProductGrid from 'components/organisms/ProductGrid';

import { ProductDataProps } from 'components/molecules/Product';

function Home() {
   function fetcher(url: string) {
      return axios
         .get(url, {
            withCredentials: true,
         })
         .then((res) => res.data || []);
   }

   const { data } = useSWR<ProductDataProps[]>('/api/product', fetcher);

   return (
      <Layout>
         <Banner />
         <HoverBanner />
         <ProductGrid products={data || []} />
      </Layout>
   );
}

export default Home;
