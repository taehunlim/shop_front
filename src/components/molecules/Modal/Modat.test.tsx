import React from 'react';
import { fireEvent, render } from '@testing-library/react';

import EmotionProvider from 'assets/EmotionProvider';
import Modal from '.';

describe('Modal Component', () => {
   const getComponent = (show?: boolean, width?: string) => {
      const onClick = jest.fn();

      const result = render(
         <EmotionProvider>
            <button type="button" onClick={() => onClick(true)}>
               show
            </button>
            <Modal width={width} show={show} onClose={() => onClick(false)}>
               modal content
            </Modal>
         </EmotionProvider>,
      );

      const Buttons = result.getAllByRole('button');
      const ShowButton = Buttons[0];
      const CloseButton = Buttons[1];
      const Container = ShowButton.nextElementSibling;
      const ContentEl = CloseButton.parentElement;

      const clickShowButton = () => fireEvent.click(ShowButton);
      const clickCloseButton = () => fireEvent.click(CloseButton);

      return {
         ShowButton,
         CloseButton,
         Container,
         ContentEl,
         clickShowButton,
         clickCloseButton,
         onClick,
      };
   };

   it('render test', () => {
      const { ShowButton, CloseButton, Container, onClick } = getComponent();

      expect(Container).not.toHaveClass('show');
      expect(Container).not.toHaveClass('hidden');

      fireEvent.click(ShowButton);
      expect(onClick).toBeCalledWith(true);

      fireEvent.click(CloseButton);
      expect(onClick).toBeCalledWith(false);
   });

   it('className show test', () => {
      const { Container, ContentEl } = getComponent(true);

      expect(Container).toHaveClass('show');
      expect(ContentEl).toHaveStyle('width: 380px');
   });

   it('className hidden test', () => {
      const { Container } = getComponent(false);

      expect(Container).toHaveClass('hidden');
   });

   it('width test', () => {
      const { Container, ContentEl } = getComponent(true, '100%');

      expect(Container).toHaveClass('show');
      expect(ContentEl).toHaveStyle('width: 100%');
   });
});
