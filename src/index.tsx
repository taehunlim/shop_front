import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import EmotionProvider from 'assets/EmotionProvider';
import App from './App';
import store from './store';

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container as Element);
root.render(
   <EmotionProvider>
      <Provider store={store}>
         <BrowserRouter>
            <App />
         </BrowserRouter>
      </Provider>
   </EmotionProvider>,
);
