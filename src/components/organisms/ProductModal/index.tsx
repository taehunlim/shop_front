import React, { useState } from 'react';

import useTypedSelector from 'hooks/useTypedSelector';
import useProductDispatch from 'hooks/useProductDispatch';
import { addToCart, deleteFromCart } from 'redux/actions/cartActions';
import {
   addToWishlist,
   deleteFromWishlist,
} from 'redux/actions/wishlistActions';

import { ProductDataProps } from 'fixtures/products';
import { getDiscountPrice } from 'utils/getDiscountPrice';

import Button from 'components/atoms/Button';
import { ProductImgWrapper } from 'components/atoms/Images';
import IconButton from 'components/molecules/IconButton';
import Modal, { ModalProps } from 'components/molecules/Modal';
import Slide from 'components/molecules/Slide';
import Variation from 'components/molecules/Variation';
import Quantity from 'components/molecules/Quantity';

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

   const {
      id,
      price,
      discount,
      image,
      name,
      fullDescription,

      variation,
   } = product;
   const discountedPrice = getDiscountPrice(price, discount);

   const [currentStock, setCurrentStock] = useState(variation[0].size[0].stock);

   const isAdded = !!cart.filter((c) => c.id === product.id)[0];
   const isWished = !!wishlist.filter((wishlist) => wishlist.id === id).length;
   const isOutOfStock = currentStock === 0;

   const addProductToCart = useProductDispatch(addToCart);

   const deleteProductFromCart = useProductDispatch(deleteFromCart);

   const addProductToWishlist = useProductDispatch(addToWishlist);

   const deleteProductFromWishlist = useProductDispatch(deleteFromWishlist);

   const getCartButtonContent = () => {
      if (isOutOfStock) return 'OUT OF STOCK';
      if (isAdded) return 'DELETE FROM CART';
      return 'ADD TO CART';
   };

   return (
      <Modal width="80%" height="auto" show={show} onClose={onClose}>
         <Container data-testid="container">
            <Slide>
               {image.map((img, i) => (
                  <ProductImgWrapper key={i}>
                     <img src={img} alt={`${name} img ${i + 1}`} />
                  </ProductImgWrapper>
               ))}
            </Slide>

            <Content>
               <h2>{name}</h2>
               <TextWrapper>
                  <Price discountedPrice={discountedPrice}>${price}</Price>
               </TextWrapper>
               <p>{fullDescription}</p>

               <Variation
                  variation={variation}
                  onChange={({ size }) => setCurrentStock(size.stock)}
               />

               <Quantity stock={currentStock} />

               <ButtonContainer>
                  <Button
                     data-testid="cart-button"
                     height={39}
                     primary
                     disabled={isOutOfStock}
                     onClick={() =>
                        isAdded
                           ? deleteProductFromCart(product)
                           : addProductToCart(product)
                     }
                  >
                     {getCartButtonContent()}
                  </Button>

                  <IconButton
                     data-testid="wish-button"
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

export default ProductModal;
