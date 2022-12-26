import { products } from 'fixtures/products';
import { ActionType } from './types';

export type ProductProps = typeof products[0];

export function addToWishlist(item: ProductProps) {
   return {
      type: ActionType.ADD_TO_WISHLIST,
      payload: item,
   };
}

export function deleteFromWishlist(item: ProductProps) {
   return {
      type: ActionType.DELETE_FROM_WISHLIST,
      payload: item,
   };
}
