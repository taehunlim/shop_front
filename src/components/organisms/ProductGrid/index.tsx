import React, { useState, useCallback } from 'react';

import {
   addToWishlist,
   deleteFromWishlist,
} from 'redux/actions/wishlistActions';
import useTypedSelector from 'hooks/useTypedSelector';

import useProductDispatch from 'hooks/useProductDispatch';
import { ProductDataProps } from 'fixtures/products';

import Product from 'components/molecules/Product';
import ProductModal from 'components/organisms/ProductModal';

import { Container, Wrapper } from './style';

interface Props {
   products: ProductDataProps[];
}

function ProductGrid({ products }: Props) {
   const wishlist = useTypedSelector((state) => state.wishlistReducer.wishlist);

   const [isShow, setIsShow] = useState<boolean>();
   const [currentProduct, setCurrentProduct] = useState(products[0]);

   const addWishlist = useProductDispatch(addToWishlist);
   const deleteWishlist = useProductDispatch(deleteFromWishlist);

   const handleQuickView = useCallback(
      (product: ProductDataProps) => {
         setIsShow(true);
         setCurrentProduct(product);
      },
      [products],
   );

   return (
      <Container>
         {products?.map((product) => {
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
         {currentProduct && (
            <ProductModal
               show={isShow}
               onClose={setIsShow}
               product={currentProduct}
            />
         )}
      </Container>
   );
}

export default ProductGrid;
