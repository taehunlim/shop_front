import React from 'react';

import Modal, { ModalProps } from 'components/molecules/Modal';

import { ProductDataProps } from 'components/molecules/Product';

import { Container, Content, TextWrapper } from './style';

interface Props extends ModalProps {
   product: ProductDataProps;
}

function ProductModal({ show, onClose, product }: Props) {
   return (
      <Modal width="auto" show={show} onClose={onClose}>
         <Container>
            <img src={product.thumbImage[0]} alt={`${product.name} img`} />
            <Content>
               <h2>{product.name}</h2>
               <TextWrapper>
                  <span>${product.price}</span>
               </TextWrapper>
               <p>{product.fullDescription}</p>
            </Content>
         </Container>
      </Modal>
   );
}

export default ProductModal;
