import React, { memo } from 'react';

import Button from 'components/atoms/Button';
import IconButton from 'components/molecules/IconButton';
import Modal, { ModalProps } from 'components/molecules/Modal';
import Slide from 'components/molecules/Slide';

import {
   getDiscountPrice,
   ProductDataProps,
} from 'components/molecules/Product';

import { Price } from 'components/molecules/Product/style';
import {
   Container,
   Content,
   ImgWrapper,
   TextWrapper,
   ButtonContainer,
} from './style';

interface Props extends ModalProps {
   product: ProductDataProps;
   isWished: boolean;
   onWish: (product: ProductDataProps) => void;
}

function ProductModal({ show, onClose, product, isWished, onWish }: Props) {
   const { price, discount } = product;
   const discountedPrice = getDiscountPrice(price, discount);

   return (
      <Modal width="80%" height="auto" show={show} onClose={onClose}>
         <Container>
            <Slide>
               {product.image.map((img, i) => (
                  <ImgWrapper key={i}>
                     <img src={img} alt={`${product.name} img ${i + 1}`} />
                  </ImgWrapper>
               ))}
            </Slide>
            {/* <img src={product.thumbImage[0]} alt={`${product.name} img`} /> */}
            <Content>
               <h2>{product.name}</h2>
               <TextWrapper>
                  <Price discountedPrice={discountedPrice}>
                     ${product.price}
                  </Price>
               </TextWrapper>
               <p>{product.fullDescription}</p>
               <ButtonContainer>
                  <Button height={39} primary>
                     ADD TO CART
                  </Button>
                  <IconButton
                     icon={isWished ? 'heart-solid' : 'heart'}
                     width={40}
                     height={40}
                     onClick={() => onWish(product)}
                  />
               </ButtonContainer>
            </Content>
         </Container>
      </Modal>
   );
}

export default memo(ProductModal);