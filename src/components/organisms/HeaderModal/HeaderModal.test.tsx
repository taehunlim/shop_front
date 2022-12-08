import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import HeaderModal from '.';
import EmotionProvider from 'assets/EmotionProvider';

describe('HeaderModal Component', () => {
   const getComponent = (show?: boolean, width?: string) => {
      const onClick = jest.fn();
      const title = 'Header Modal';

      const result = render(
         <EmotionProvider>
            <button onClick={() => onClick(true)}>show</button>
            <HeaderModal
               title={title}
               width={width}
               show={show}
               onClose={() => onClick(false)}
            />
         </EmotionProvider>,
      );

      const EmptyContent = result.getByText(title);
      const Buttons = result.getAllByRole('button');
      const ShowButton = Buttons[0];
      const CloseButton = Buttons[1];
      const Container = ShowButton.nextElementSibling;
      const ContentEl = CloseButton.parentElement;

      const clickShowButton = () => fireEvent.click(ShowButton);
      const clickCloseButton = () => fireEvent.click(CloseButton);

      return {
         EmptyContent,
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
      const {
         EmptyContent,
         Container,
         onClick,
         clickShowButton,
         clickCloseButton,
      } = getComponent();

      expect(Container).not.toHaveClass('show');
      expect(Container).not.toHaveClass('hidden');
      expect(EmptyContent).toBeInTheDocument();

      clickShowButton();
      expect(onClick).toBeCalledWith(true);

      clickCloseButton();
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
