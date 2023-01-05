import React, { memo, useMemo } from 'react';
import { Link } from 'react-router-dom';

import IconButton from 'components/molecules/IconButton';

import { getDiscountPrice } from 'utils/getDiscountPrice';

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
} from './style';

export type ProductDataProps = typeof products[0];

export interface ProductProps {
   product: ProductDataProps;
   isWished: boolean;

   onWish: (product: ProductDataProps) => void;
   onQuickView: (product: ProductDataProps) => void;
}

function Product({ product, isWished, onWish, onQuickView }: ProductProps) {
   const { new: isNew, stock, price, discount, thumbImage, name } = product;

   const discountedPrice = useMemo(
      () => getDiscountPrice(price, discount),
      [product],
   );
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
               padding="10px 10px"
               primary
               width={20}
               height={20}
               data-testid={isWished ? 'wished-button' : 'wish-button'}
               onClick={() => onWish(product)}
            />

            <IconButton
               icon="search"
               padding="10px 10px"
               primary
               width={20}
               height={20}
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
