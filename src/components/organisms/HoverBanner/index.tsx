import React from 'react';
import { Link } from 'react-router-dom';

import Slide from 'components/molecules/Slide';
import { Container, BannerContainer, Content } from './style';

function HoverBanner() {
   return (
      <Container>
         <Slide slidePerView={3} slideGap={30} centerGap>
            <BannerContainer>
               <img
                  src="/assets/images/sub-banner-size.jpg"
                  alt="hover-banner-1"
               />
               <Content>
                  <p>Product</p>
                  <Link to="/">SHOP NOW</Link>
               </Content>
            </BannerContainer>
            <BannerContainer>
               <img
                  src="/assets/images/sub-banner-size.jpg"
                  alt="hover-banner-2"
               />
               <Content>
                  <p>Product</p>
                  <Link to="/">SHOP NOW</Link>
               </Content>
            </BannerContainer>
            <BannerContainer>
               <img
                  src="/assets/images/sub-banner-size.jpg"
                  alt="hover-banner-3"
               />
               <Content>
                  <p>Product</p>
                  <Link to="/">SHOP NOW</Link>
               </Content>
            </BannerContainer>
         </Slide>
      </Container>
   );
}

export default HoverBanner;
