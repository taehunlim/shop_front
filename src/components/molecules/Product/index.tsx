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

export type ProductType = typeof products[0];

interface Props {
   product: ProductType;
   isWished: boolean;

   onWish: (product: ProductType) => void;
}

function Product({ product, isWished, onWish }: Props) {
   const { new: isNew, stock, price, discount, thumbImage, name } = product;

   const getDiscountPrice = (price: number, discount: number): PriceType => {
      const discountedPrice = (price - price * (discount / 100)).toFixed(
         2,
      ) as PriceType;

      return discount && discount > 0 ? discountedPrice : '0';
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
               {discount && <Badge type="sale">{discount}%</Badge>}
               {isNew && <Badge type="new">new</Badge>}
               {!stock && <Badge>out</Badge>}
            </BadgeContainer>
         </ProductImgWrapper>
         <ButtonContainer>
            <IconButton onClick={() => onWish(product)}>
               <Icon icon={isWished ? 'heart-solid' : 'heart'} />
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
