import React from 'react';
import { useDispatch } from 'react-redux';

import { addToWishlist } from 'redux/actions/wishlistActions';

import Product from 'components/molecules/Product';

import { products } from 'fixtures/products';

import { Container, Wrapper } from './style';

function ProductLists() {
   const dispatch = useDispatch();
   return (
      <Container>
         {products.map((product) => (
            <Wrapper key={product.id}>
               <Product
                  product={product}
                  onWish={() => dispatch(addToWishlist(product))}
               />
            </Wrapper>
         ))}
      </Container>
   );
}

export default ProductLists;
