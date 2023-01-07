import React, { memo } from 'react';

import { ProductImgWrapper } from 'components/atoms/Images';
import Modal, { ModalProps } from 'components/molecules/Modal';

import { products } from 'fixtures/products';

import { Container, Title } from './style';

interface Props extends ModalProps {
   data?: typeof products;
   title: string;
}

function HeaderModal({ data, title, show, onClose, width, ...props }: Props) {
   return (
      <Modal
         {...props}
         modalStyle="sidebar"
         width={width}
         show={show}
         onClose={onClose}
      >
         <Container>
            <Title>{title}</Title>
            {data?.length ? (
               data.map((product) => (
                  <ProductImgWrapper key={product.id}>
                     <img src={product.thumbImage[0]} alt={product.name} />
                  </ProductImgWrapper>
               ))
            ) : (
               <span>No Items found in {title.toLowerCase()}</span>
            )}
         </Container>
      </Modal>
   );
}

export default memo(HeaderModal);
