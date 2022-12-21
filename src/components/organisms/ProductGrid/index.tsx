import React from 'react';
import { Link } from 'react-router-dom';

import Icon from 'components/atoms/Icon';

import {
   Container,
   ProductImgWrapper,
   ButtonContainer,
   IconButton,
   Content,
   ContentTitle,
   Title,
   HoverText,
   Price,
   Cost,
} from './style';

function ProductGrid({ product }: any) {
   const getDiscountPrice = (price: number, discount: number) =>
      discount && discount > 0 ? price - price * (discount / 100) : price;

   const discountedPrice = getDiscountPrice(
      product.price,
      product.discount,
   ).toFixed(2);
   const productPrice = product.price.toFixed(2);

   return (
      <Container>
         <ProductImgWrapper>
            <Link to="/">
               <img src={product.thumbImage[0]} alt={product.name} />
            </Link>
         </ProductImgWrapper>
         <ButtonContainer>
            <IconButton>
               <Icon icon="heart" />
            </IconButton>
            <IconButton>
               <Icon icon="heart" />
            </IconButton>
            <IconButton>
               <Icon icon="heart" />
            </IconButton>
         </ButtonContainer>
         <Content>
            <ContentTitle>
               <Link to="/">
                  <Title>{product.name}</Title>
               </Link>
               <Link to="/">
                  <HoverText>Buy now</HoverText>
               </Link>
            </ContentTitle>
            <Price>
               {discountedPrice ? (
                  <Cost>{productPrice}</Cost>
               ) : (
                  <span>${productPrice}</span>
               )}
               {discountedPrice && <span>${discountedPrice}</span>}
            </Price>
         </Content>
      </Container>
   );
}

export default ProductGrid;
