import React from 'react';

import Layout from 'components/templates/Layout';
import Banner from 'components/organisms/Banner';
import HoverBanner from 'components/organisms/HoverBanner';
import Product from 'components/molecules/Product';

import { products } from 'fixtures/products';

function Home() {
   return (
      <Layout>
         <Banner />
         <HoverBanner />

         <Product product={products[0]} />
      </Layout>
   );
}

export default Home;
