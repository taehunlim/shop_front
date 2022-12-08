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
      const ContentEl = () => CloseButton.parentElement;

      const clickShowButton = () => fireEvent.click(ShowButton);
      const clickCloseButton = () => fireEvent.click(CloseButton);

      return {
         EmptyContent,
         ShowButton,
         Container,
         ContentEl,
         clickShowButton,
         clickCloseButton,
         onClick,
      };
   };

   it('render test', () => {
      const { ShowButton, Container } = getComponent();

      expect(ShowButton).toBeInTheDocument();
      expect(Container).not.toBeVisible();
      expect(Container).not.toHaveClass('show');
      expect(Container).not.toHaveClass('hidden');
   });

   it('className show test', () => {
      const { Container, ContentEl, clickCloseButton, onClick } =
         getComponent(true);

      expect(Container).toBeVisible();
      expect(Container).toHaveClass('show');
      expect(ContentEl()).toHaveStyle('width: 380px');

      clickCloseButton();
      expect(onClick).toBeCalledWith(false);
   });

   it('className hidden test', () => {
      const { Container, clickShowButton, onClick } = getComponent(false);

      expect(Container).not.toBeVisible();
      expect(Container).toHaveClass('hidden');

      clickShowButton();
      expect(onClick).toBeCalledWith(true);
   });

   it('width test', () => {
      const { ContentEl } = getComponent(true, '100%');

      expect(ContentEl()).toHaveStyle('width: 100%');
   });
});
