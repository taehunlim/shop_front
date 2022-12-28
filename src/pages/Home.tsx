import React from 'react';

import Layout from 'components/templates/Layout';
import Banner from 'components/organisms/Banner';
import HoverBanner from 'components/organisms/HoverBanner';
import ProductGrid from 'components/organisms/ProductGrid';

function Home() {
   return (
      <Layout>
         <Banner />
         <HoverBanner />

         <ProductGrid />
      </Layout>
   );
}

export default Home;
