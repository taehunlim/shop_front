import {combineReducers} from "redux";

import Reducer from './reducer';


export type RootState = ReturnType<typeof rootReducer>;

const rootReducer = combineReducers({
    Reducer
});

export default rootReducer;

