import React from 'react';
import { fireEvent, render } from '@testing-library/react';

import EmotionProvider from 'assets/EmotionProvider';
import Modal from './Modal';

describe('Modal Component', () => {
   const setStateMock = jest.fn();

   const getComponent = (show?: boolean, width?: string) => {
      return render(
         <EmotionProvider>
            <button type="button" onClick={() => setStateMock(true)}>
               show
            </button>
            <Modal
               width={width}
               show={show}
               onClose={() => setStateMock(false)}
            >
               modal content
            </Modal>
         </EmotionProvider>,
      );
   };

   it('render test', () => {
      const { getAllByRole } = getComponent();
      const buttons = getAllByRole('button');
      const showButton = buttons[0];

      const container = showButton.nextElementSibling;

      expect(container).not.toHaveClass('show');
      expect(container).not.toHaveClass('hidden');

      fireEvent.click(buttons[0]);
      expect(setStateMock).toBeCalledWith(true);

      fireEvent.click(buttons[1]);
      expect(setStateMock).toBeCalledWith(false);
   });

   it('className show test', () => {
      const { getAllByRole } = getComponent(true);
      const buttons = getAllByRole('button');
      const showButton = buttons[0];
      const closeButton = buttons[1];

      const container = showButton.nextElementSibling;
      const contentEl = closeButton.parentElement;

      expect(container).toHaveClass('show');
      expect(contentEl).toHaveStyle('width: 380px');
   });

   it('className hidden test', () => {
      const { getAllByRole } = getComponent(false);
      const buttons = getAllByRole('button');
      const showButton = buttons[0];

      const container = showButton.nextElementSibling;

      expect(container).toHaveClass('hidden');
   });

   it('width test', () => {
      const { getAllByRole } = getComponent(true, '100%');
      const buttons = getAllByRole('button');
      const showButton = buttons[0];
      const closeButton = buttons[1];

      const container = showButton.nextElementSibling;
      const contentEl = closeButton.parentElement;

      expect(container).toHaveClass('show');
      expect(contentEl).toHaveStyle('width: 100%');
   });
});
