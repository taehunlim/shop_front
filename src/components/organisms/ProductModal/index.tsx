import React, { memo } from 'react';

import Button from 'components/atoms/Button';
import IconButton from 'components/molecules/IconButton';
import Modal, { ModalProps } from 'components/molecules/Modal';
import { ProductDataProps } from 'components/molecules/Product';

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
   return (
      <Modal width="80%" height="auto" show={show} onClose={onClose}>
         <Container>
            <ImgWrapper>
               <img src={product.thumbImage[0]} alt={`${product.name} img`} />
            </ImgWrapper>
            <Content>
               <h2>{product.name}</h2>
               <TextWrapper>
                  <span>${product.price}</span>
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
