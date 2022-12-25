import wishlistReducer from '.';

import { addToWishlist } from 'redux/actions/wishlistActions';

import { products } from 'fixtures/products';

describe('reducer', () => {
   describe('addToWishlist', () => {
      it('changes tasks array', () => {
         const initialState = {
            wishlist: [],
         };

         const state = wishlistReducer(
            initialState,
            addToWishlist(products[0]),
         );

         expect(state?.wishlist).not.toHaveLength(0);
      });
   });
});
