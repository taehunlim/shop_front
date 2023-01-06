import React, { memo } from 'react';

import Modal, { ModalProps } from 'components/molecules/Modal';
import Product from 'components/molecules/Product';

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
                  <Product
                     key={product.id}
                     product={product}
                     isWished
                     onQuickView={console.log}
                     onWish={console.log}
                  />
               ))
            ) : (
               <span>No Items found in {title.toLowerCase()}</span>
            )}
         </Container>
      </Modal>
   );
}

export default memo(HeaderModal);
