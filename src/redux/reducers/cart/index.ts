import { ProductProps } from 'redux/actions/cartActions';
import ActionType from 'redux/actions/types';

interface InitialState {
   cart: ProductProps[];
}

interface Action {
   type: ActionType;
   payload: any;
}

const initialState = {
   cart: [],
};

export default function cartReducer(
   state: InitialState = initialState,
   action: Action,
) {
   switch (action.type) {
      case ActionType.ADD_TO_CART:
         return {
            ...state,
            cart: [...state.cart, action.payload],
         };

      case ActionType.DELETE_FROM_CART:
         return {
            ...state,
            cart: state.cart.filter((cart) => cart !== action.payload),
         };

      default:
         return state;
   }
}
