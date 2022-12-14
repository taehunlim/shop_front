import React from 'react';

import Slide from 'components/molecules/Slide';

import { Container, BannerWrapper } from './style';

function Banner() {
   return (
      <Container>
         <Slide slideGap={30} slidePerView={2}>
            <BannerWrapper />
            <BannerWrapper />
            <BannerWrapper />
         </Slide>
      </Container>
   );
}

export default Banner;
