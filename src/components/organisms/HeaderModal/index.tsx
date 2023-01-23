import React, { memo } from 'react';
import { Link } from 'react-router-dom';

import { ProductDataProps } from 'apis/useProduct';

import { ProductImgWrapper } from 'components/atoms/Images';
import Modal, { ModalProps } from 'components/molecules/Modal';

import {
   Container,
   Title,
   ProductContainer,
   ProductContent,
   DeleteButton,
   SearchInput,
} from './style';

interface Props extends ModalProps {
   data?: ProductDataProps[];
   title: string;
   onDelete?: (product: ProductDataProps) => void;
   onSearch?: (keyword: string) => void;
}

function HeaderModal({
   data,
   title,
   show,
   onClose,
   onDelete,
   onSearch,
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
                  <SearchInput
                     type="text"
                     placeholder="Search"
                     onChange={({ target }) =>
                        onSearch && onSearch(target.value)
                     }
                  />
               </div>
            )}
            {data?.length ? (
               data.map((product) => (
                  <ProductContainer key={product.id}>
                     {title !== 'Search' && (
                        <DeleteButton
                           onClick={() => onDelete && onDelete(product)}
                        >
                           ✕
                        </DeleteButton>
                     )}

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
