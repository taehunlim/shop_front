import React from 'react';

import Layout from 'components/templates/Layout';
import Banner from 'components/organisms/Banner';
import HoverBanner from 'components/organisms/HoverBanner';
import ProductGrid from 'components/organisms/ProductGrid';

import { products } from 'fixtures/products';

function Home() {
   return (
      <Layout>
         <Banner />
         <HoverBanner />

         <ProductGrid product={products[0]} />
      </Layout>
   );
}

export default Home;
