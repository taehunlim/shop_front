import { ProductProps } from 'redux/actions/wishlistActions';

import ActionType from 'redux/actions/types';

interface InitialState {
   wishlist: ProductProps[];
}

type Action = {
   type: ActionType;
   payload: any;
};

const initialState = {
   wishlist: [],
};

export default function Reducer(
   state: InitialState = initialState,
   action: Action,
) {
   switch (action.type) {
      case ActionType.ADD_TO_WISHLIST:
         return {
            ...state,
            wishlist: [...state.wishlist, action.payload],
         };

      default:
         return state;
   }
}
