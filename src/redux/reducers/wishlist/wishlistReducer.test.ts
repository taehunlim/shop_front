import wishlistReducer from '.';

import {
   addToWishlist,
   deleteFromWishlist,
} from 'redux/actions/wishlistActions';

import { products } from 'fixtures/products';

describe('wishlist reducer', () => {
   describe('addToWishlist', () => {
      it('changes wishlist array', () => {
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

   describe('deleteFromWishlist', () => {
      it('remove the product from wishlist', () => {
         const initialState = {
            wishlist: [products[0]],
         };

         const state = wishlistReducer(
            initialState,
            deleteFromWishlist(products[0]),
         );

         expect(state?.wishlist).toHaveLength(0);
      });
   });
});
