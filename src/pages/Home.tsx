import React from 'react';

import Layout from 'components/templates/Layout';
import Banner from 'components/organisms/Banner';
import HoverBanner from 'components/organisms/HoverBanner';

function Home() {
   return (
      <Layout>
         <Banner />
         <HoverBanner />
      </Layout>
   );
}

export default Home;
