import cartReducer from '.';

import { addToCart, deleteFromCart } from 'redux/actions/cartActions';

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

   describe('deleteFromCart', () => {
      it('remove the product from cart', () => {
         const initialState = {
            cart: [products[0]],
         };

         const state = cartReducer(initialState, deleteFromCart(products[0]));

         expect(state.cart).toHaveLength(0);
      });
   });
});
