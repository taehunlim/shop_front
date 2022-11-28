import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

import {Provider} from "react-redux";
import store from "./store";


const container = document.getElementById('root');
const root = ReactDOM.createRoot(container as Element);
root.render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>,
);