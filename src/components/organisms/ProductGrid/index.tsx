import React, { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';

import {
   addToWishlist,
   deleteFromWishlist,
} from 'redux/actions/wishlistActions';

import useTypedSelector from 'hooks/useTypedSelector';

import Product, { ProductDataProps } from 'components/molecules/Product';
import ProductModal from 'components/organisms/ProductModal';

import { products } from 'fixtures/products';

import { Container, Wrapper } from './style';

function ProductGrid() {
   const wishlist = useTypedSelector((state) => state.wishlistReducer.wishlist);
   const dispatch = useDispatch();

   const [isShow, setIsShow] = useState<boolean>();
   const [currentProduct, setCurrentProduct] = useState(products[0]);

   const addWishlist = useCallback(
      (product: ProductDataProps) => dispatch(addToWishlist(product)),
      [dispatch],
   );

   const deleteWishlist = useCallback(
      (product: ProductDataProps) => dispatch(deleteFromWishlist(product)),
      [dispatch],
   );

   const handleQuickView = useCallback(
      (product: ProductDataProps) => {
         setIsShow(true);
         setCurrentProduct(product);
      },
      [products],
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
                     onQuickView={handleQuickView}
                  />
               </Wrapper>
            );
         })}
         <ProductModal
            show={isShow}
            onClose={setIsShow}
            product={currentProduct}
         />
      </Container>
   );
}

export default ProductGrid;
