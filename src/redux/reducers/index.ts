import { combineReducers } from 'redux';

import wishlistReducer from '../reducers/wishlist';

export type RootState = ReturnType<typeof rootReducer>;

const rootReducer = combineReducers({
   wishlistReducer,
});

export default rootReducer;
