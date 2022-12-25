import React from 'react';

import useTypedSelector from 'hooks/useTypedSelector';

import Layout from 'components/templates/Layout';
import Banner from 'components/organisms/Banner';
import HoverBanner from 'components/organisms/HoverBanner';
import ProductList from 'components/organisms/ProductList';

function Home() {
   const state = useTypedSelector((state) => state);

   console.log(state);
   return (
      <Layout>
         <Banner />
         <HoverBanner />

         <ProductList />
      </Layout>
   );
}

export default Home;
