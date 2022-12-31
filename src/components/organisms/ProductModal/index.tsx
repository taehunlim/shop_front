import React from 'react';

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
}

function ProductModal({ show, onClose, product }: Props) {
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
                  <IconButton width={40} height={40} icon="heart" />
               </ButtonContainer>
            </Content>
         </Container>
      </Modal>
   );
}

export default ProductModal;
