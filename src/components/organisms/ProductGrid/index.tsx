import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import {
   addToWishlist,
   deleteFromWishlist,
} from 'redux/actions/wishlistActions';

import useTypedSelector from 'hooks/useTypedSelector';

import Product, { ProductType } from 'components/molecules/Product';

import { products } from 'fixtures/products';

import { Container, Wrapper } from './style';

function ProductGrid() {
   const wishlist = useTypedSelector((state) => state.wishlistReducer.wishlist);
   const dispatch = useDispatch();

   const addWishlist = useCallback(
      (product: ProductType) => dispatch(addToWishlist(product)),
      [dispatch],
   );

   const deleteWishlist = useCallback(
      (product: ProductType) => dispatch(deleteFromWishlist(product)),
      [dispatch],
   );

   return (
      <Container>
         {products.map((product) => {
            const isWished = !!wishlist.filter(
               (wishlist) => wishlist.id === product.id,
            ).length;

            return (
               <Wrapper key={product.id}>
                  <Product
                     product={product}
                     isWished={isWished}
                     onWish={isWished ? deleteWishlist : addWishlist}
                  />
               </Wrapper>
            );
         })}
      </Container>
   );
}

export default ProductGrid;
