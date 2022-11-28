import { createStore, applyMiddleware } from 'redux';
import thunk from "redux-thunk";

import rootReducer from './redux/reducers/index';
// import Reducer from "./redux/reducers/reducer";

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;