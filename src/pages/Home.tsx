import React from 'react';

import Layout from 'components/templates/Layout';
import Banner from 'components/organisms/Banner';
import HoverBanner from 'components/organisms/HoverBanner';
import ProductGrid from 'components/organisms/ProductGrid';

import useProduct from 'apis/useProduct';

function Home() {
   const { data } = useProduct();

   return (
      <Layout>
         <Banner />
         <HoverBanner />
         <ProductGrid products={data || []} />
      </Layout>
   );
}

export default Home;
