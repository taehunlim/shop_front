import { lazy } from 'react';

const setLazyImport = (path: string) =>
   lazy(() => import(/* webpackChunkName: "[request]" */ `../pages/${path}`));

export const Home = setLazyImport('Home');
export const Product = setLazyImport('Product');
