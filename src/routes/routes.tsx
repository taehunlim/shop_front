import { importAll } from 'routes/importAll';

const routes = importAll(
   require.context(/* webpackChunkName: "[request]" */ '../pages'),
);

export { routes };
