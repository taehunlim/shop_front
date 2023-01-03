import { combineReducers } from 'redux';

import wishlistReducer from '../reducers/wishlist';
import cartReducer from '../reducers/cart';

export type RootState = ReturnType<typeof rootReducer>;

const rootReducer = combineReducers({
   wishlistReducer,
   cartReducer,
});

export default rootReducer;
