import React from 'react';

import Product from 'components/molecules/Product';

import { products } from 'fixtures/products';

import { Container, Wrapper } from './style';

function ProductLists() {
   return (
      <Container>
         {products.map((product) => (
            <Wrapper>
               <Product product={product} />
            </Wrapper>
         ))}
      </Container>
   );
}

export default ProductLists;
