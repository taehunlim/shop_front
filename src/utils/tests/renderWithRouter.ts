import { ReactElement } from 'react';
import userEvent from '@testing-library/user-event';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

export function renderWithRouter(ui: ReactElement, { route = '/' } = {}) {
   window.history.pushState({}, 'Test page', route);

   return {
      user: userEvent.setup(),
      ...render(ui, { wrapper: BrowserRouter }),
   };
}
