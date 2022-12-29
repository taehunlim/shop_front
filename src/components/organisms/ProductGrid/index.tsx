import React, { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';

import {
   addToWishlist,
   deleteFromWishlist,
} from 'redux/actions/wishlistActions';

import useTypedSelector from 'hooks/useTypedSelector';

import Product, { ProductDataProps } from 'components/molecules/Product';
import Modal from 'components/molecules/Modal';

import { products } from 'fixtures/products';

import { Container, Wrapper } from './style';

function ProductGrid() {
   const wishlist = useTypedSelector((state) => state.wishlistReducer.wishlist);
   const dispatch = useDispatch();

   const [isShow, setIsShow] = useState<boolean>();
   const [currentProduct, setCurrentProduct] = useState<ProductDataProps>();

   const addWishlist = useCallback(
      (product: ProductDataProps) => dispatch(addToWishlist(product)),
      [dispatch],
   );

   const deleteWishlist = useCallback(
      (product: ProductDataProps) => dispatch(deleteFromWishlist(product)),
      [dispatch],
   );

   const handleQuickView = useCallback(onQuickView, [products]);

   function onQuickView(product: ProductDataProps) {
      setIsShow(true);
      setCurrentProduct(product);
   }

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
                     onQuickView={handleQuickView}
                  />
               </Wrapper>
            );
         })}
         <Modal show={isShow} onClose={setIsShow}>
            {currentProduct?.name}
         </Modal>
      </Container>
   );
}

export default ProductGrid;
