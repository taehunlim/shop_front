import importAll from 'routes';

const routes = importAll(require.context('../pages', true, /\.tsx$/, 'weak'));

export { routes };
