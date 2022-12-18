import React from 'react';

import Slide from 'components/molecules/Slide';
import { Container, BannerContainer } from './style';

function HoverBanner() {
   return (
      <Container>
         <Slide slidePerView={3} slideGap={30} centerGap>
            <BannerContainer>
               <img
                  src="/assets/images/sub-banner-size.jpg"
                  alt="hover-banner-1"
               />
            </BannerContainer>
            <BannerContainer>
               <img
                  src="/assets/images/sub-banner-size.jpg"
                  alt="hover-banner-2"
               />
            </BannerContainer>
            <BannerContainer>
               <img
                  src="/assets/images/sub-banner-size.jpg"
                  alt="hover-banner-3"
               />
            </BannerContainer>
         </Slide>
      </Container>
   );
}

export default HoverBanner;
