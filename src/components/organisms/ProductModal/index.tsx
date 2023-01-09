import React, { memo, useMemo, useCallback } from 'react';
import { useDispatch } from 'react-redux';

import useTypedSelector from 'hooks/useTypedSelector';
import { addToCart, deleteFromCart } from 'redux/actions/cartActions';

import Button from 'components/atoms/Button';
import { ProductImgWrapper } from 'components/atoms/Images';
import IconButton from 'components/molecules/IconButton';
import Modal, { ModalProps } from 'components/molecules/Modal';
import Slide from 'components/molecules/Slide';

import { ProductDataProps } from 'components/molecules/Product';

import { getDiscountPrice } from 'utils/getDiscountPrice';

import { Price } from 'components/molecules/Product/style';
import { Container, Content, TextWrapper, ButtonContainer } from './style';

interface Props extends ModalProps {
   product: ProductDataProps;
   isWished: boolean;
   onWish: (product: ProductDataProps) => void;
}

function ProductModal({ show, onClose, product, isWished, onWish }: Props) {
   const cart = useTypedSelector((state) => state.cartReducer.cart);
   const dispatch = useDispatch();

   const { price, discount } = product;
   const discountedPrice = useMemo(
      () => getDiscountPrice(price, discount),
      [product],
   );

   const isAdded = !!cart.filter((c) => c.id === product.id)[0];

   const addProductToCart = useCallback(
      (product: ProductDataProps) => dispatch(addToCart(product)),
      [dispatch],
   );

   const deleteProductFromCart = useCallback(
      (product: ProductDataProps) => dispatch(deleteFromCart(product)),
      [dispatch],
   );

   return (
      <Modal width="80%" height="auto" show={show} onClose={onClose}>
         <Container data-testid="container">
            <Slide>
               {product.image.map((img, i) => (
                  <ProductImgWrapper key={i}>
                     <img src={img} alt={`${product.name} img ${i + 1}`} />
                  </ProductImgWrapper>
               ))}
            </Slide>

            <Content>
               <h2>{product.name}</h2>
               <TextWrapper>
                  <Price discountedPrice={discountedPrice}>
                     ${product.price}
                  </Price>
               </TextWrapper>
               <p>{product.fullDescription}</p>
               <ButtonContainer>
                  <Button
                     height={39}
                     primary
                     onClick={() =>
                        isAdded
                           ? deleteProductFromCart(product)
                           : addProductToCart(product)
                     }
                  >
                     {isAdded ? 'DELETE FROM CART' : 'ADD TO CART'}
                  </Button>
                  <IconButton
                     data-testid={isWished ? 'wished-button' : 'wish-button'}
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
