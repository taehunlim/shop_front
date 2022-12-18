import React from 'react';

import Slide from 'components/molecules/Slide';
import { banners } from 'fixtures/banners';

import { Container, BannerWrapper } from './style';

function Banner() {
   return (
      <Container>
         <Slide>
            {banners.map((banner) => (
               <BannerWrapper key={banner.id} url={banner.img} />
            ))}
         </Slide>
      </Container>
   );
}

export default Banner;
