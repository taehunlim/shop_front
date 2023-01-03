import cartReducer from '.';

import { addToCart } from 'redux/actions/cartActions';

import { products } from 'fixtures/products';

describe('cart reducer', () => {
   describe('addToCart', () => {
      it('change cart array', () => {
         const initialState = {
            cart: [],
         };

         const state = cartReducer(initialState, addToCart(products[0]));

         expect(state.cart).not.toHaveLength(0);
      });
   });
});
