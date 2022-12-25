import React from 'react';
import { useDispatch } from 'react-redux';

import { addToWishlist } from 'redux/actions/wishlistActions';

import Product, { ProductType } from 'components/molecules/Product';

import { products } from 'fixtures/products';

import { Container, Wrapper } from './style';

function ProductLists() {
   const dispatch = useDispatch();

   function handleWishlist(product: ProductType) {
      dispatch(addToWishlist(product));
   }

   return (
      <Container>
         {products.map((product) => (
            <Wrapper key={product.id}>
               <Product product={product} onWish={handleWishlist} />
            </Wrapper>
         ))}
      </Container>
   );
}

export default ProductLists;
