import React, { memo } from 'react';
import { Link } from 'react-router-dom';

import Input from 'components/atoms/Input';
import { ProductImgWrapper } from 'components/atoms/Images';
import { ProductDataProps } from 'components/molecules/Product';
import Modal, { ModalProps } from 'components/molecules/Modal';

import { products } from 'fixtures/products';

import {
   Container,
   Title,
   ProductContainer,
   ProductContent,
   DeleteButton,
} from './style';

interface Props extends ModalProps {
   data?: typeof products;
   title: string;
   onDelete?: (product: ProductDataProps) => void;
}

function HeaderModal({
   data,
   title,
   show,
   onClose,
   onDelete,
   width,
   ...props
}: Props) {
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
            {title === 'Search' && (
               <div>
                  <Input />
               </div>
            )}
            {data?.length ? (
               data.map((product) => (
                  <ProductContainer key={product.id}>
                     <DeleteButton
                        onClick={() => onDelete && onDelete(product)}
                     >
                        ✕
                     </DeleteButton>
                     <ProductImgWrapper>
                        <Link to="/">
                           <img
                              src={product.thumbImage[0]}
                              alt={product.name}
                           />
                        </Link>
                     </ProductImgWrapper>

                     <ProductContent>
                        <Link to="/">{product.name}</Link>
                        <p>
                           <span>1x </span>
                           <b>${product.price}</b>
                        </p>
                     </ProductContent>
                  </ProductContainer>
               ))
            ) : (
               <span>No Items found in {title.toLowerCase()}</span>
            )}
         </Container>
      </Modal>
   );
}

export default memo(HeaderModal);
