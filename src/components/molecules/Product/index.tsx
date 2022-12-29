import React, { memo } from 'react';
import { Link } from 'react-router-dom';

import Icon from 'components/atoms/Icon';

import { products } from 'fixtures/products';

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
   BadgeContainer,
   Badge,
   PriceType,
} from './style';

export type { PriceType };

export type ProductDataProps = typeof products[0];

export interface ProductProps {
   product: ProductDataProps;
   isWished: boolean;

   onWish: (product: ProductDataProps) => void;
   onQuickView: (product: ProductDataProps) => void;
}

function Product({ product, isWished, onWish, onQuickView }: ProductProps) {
   const { new: isNew, stock, price, discount, thumbImage, name } = product;

   const getDiscountPrice = (price: number, discount: number): PriceType => {
      const discountedPrice = (price - price * (discount / 100)).toFixed(
         2,
      ) as PriceType;

      return discount && discount > 0 ? discountedPrice : null;
   };

   const discountedPrice = getDiscountPrice(price, discount);
   const productPrice = price.toFixed(2);

   return (
      <Container>
         <ProductImgWrapper>
            <Link to="/">
               <img src={thumbImage[0]} alt={name} />
            </Link>

            <BadgeContainer>
               {discountedPrice && <Badge type="sale">{discount}%</Badge>}
               {isNew && <Badge type="new">new</Badge>}
               {!stock && <Badge>out</Badge>}
            </BadgeContainer>
         </ProductImgWrapper>
         <ButtonContainer>
            <IconButton
               data-testid="wish-button"
               onClick={() => onWish(product)}
            >
               <Icon
                  data-testid={isWished ? 'wished' : ''}
                  icon={isWished ? 'heart-solid' : 'heart'}
               />
            </IconButton>
            <IconButton
               data-testid="quick-view-button"
               onClick={() => onQuickView(product)}
            >
               <Icon icon="search" />
            </IconButton>
         </ButtonContainer>
         <Content>
            <ContentTitle>
               <Link to="/">
                  <Title>{name}</Title>
               </Link>
               <Link to="/">
                  <HoverText>Buy now</HoverText>
               </Link>
            </ContentTitle>
            <Price discountedPrice={discountedPrice}>{productPrice}</Price>
         </Content>
      </Container>
   );
}

export default memo(Product);
