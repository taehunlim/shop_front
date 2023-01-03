import { products } from 'fixtures/products';
import ActionType from './types';

export type ProductProps = typeof products[0];

export function addToCart(item: ProductProps) {
   return {
      type: ActionType.ADD_TO_CART,
      payload: item,
   };
}

export function deleteFromCart(item: ProductProps) {
   return {
      type: ActionType.DELETE_FROM_CART,
      payload: item,
   };
}
