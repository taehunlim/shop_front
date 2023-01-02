import React, { memo } from 'react';
import { Link } from 'react-router-dom';

import IconButton from 'components/molecules/IconButton';

import { products } from 'fixtures/products';

import {
   Container,
   ProductImgWrapper,
   ButtonContainer,
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

export const getDiscountPrice = (
   price: number,
   discount: number,
): PriceType => {
   const discountedPrice = (price - price * (discount / 100)).toFixed(
      2,
   ) as PriceType;

   return discount && discount > 0 ? discountedPrice : null;
};

function Product({ product, isWished, onWish, onQuickView }: ProductProps) {
   const { new: isNew, stock, price, discount, thumbImage, name } = product;

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
               icon={isWished ? 'heart-solid' : 'heart'}
               width={40}
               height={40}
               data-testid={isWished ? 'wished-button' : 'wish-button'}
               onClick={() => onWish(product)}
            />

            <IconButton
               icon="search"
               width={40}
               height={40}
               data-testid="quick-view-button"
               onClick={() => onQuickView(product)}
            />
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
