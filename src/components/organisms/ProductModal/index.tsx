import React, { memo, useMemo, useCallback } from 'react';
import { useDispatch } from 'react-redux';

import useTypedSelector from 'hooks/useTypedSelector';
import { addToCart, deleteFromCart } from 'redux/actions/cartActions';
import {
   addToWishlist,
   deleteFromWishlist,
} from 'redux/actions/wishlistActions';

import { ProductDataProps } from 'apis/useProduct';
import { getDiscountPrice } from 'utils/getDiscountPrice';

import Button from 'components/atoms/Button';
import { ProductImgWrapper } from 'components/atoms/Images';
import IconButton from 'components/molecules/IconButton';
import Modal, { ModalProps } from 'components/molecules/Modal';
import Slide from 'components/molecules/Slide';

import { Price } from 'components/molecules/Product/style';
import { Container, Content, TextWrapper, ButtonContainer } from './style';

interface Props extends ModalProps {
   product: ProductDataProps;
}

function ProductModal({ show, onClose, product }: Props) {
   const { cart, wishlist } = useTypedSelector((state) => {
      const { cartReducer, wishlistReducer } = state;
      return {
         cart: cartReducer.cart,
         wishlist: wishlistReducer.wishlist,
      };
   });
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

   const addProductToWishlist = useCallback(
      (product: ProductDataProps) => dispatch(addToWishlist(product)),
      [dispatch],
   );

   const deleteProductFromWishlist = useCallback(
      (product: ProductDataProps) => dispatch(deleteFromWishlist(product)),
      [dispatch],
   );

   const isWished = !!wishlist.filter((wishlist) => wishlist.id === product.id)
      .length;

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
                     onClick={() =>
                        isWished
                           ? deleteProductFromWishlist(product)
                           : addProductToWishlist(product)
                     }
                  />
               </ButtonContainer>
            </Content>
         </Container>
      </Modal>
   );
}

export default memo(ProductModal);
