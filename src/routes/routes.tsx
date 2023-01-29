import React from 'react';

import { Home, Product } from './index';

const routes = [
   { path: '/', element: <Home /> },
   { path: '/product/:id', element: <Product /> },
];

export { routes };
