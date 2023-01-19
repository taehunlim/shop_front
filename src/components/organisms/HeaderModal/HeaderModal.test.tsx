import React from 'react';
import { fireEvent } from '@testing-library/react';

import { renderWithRouter } from 'utils/tests/renderWithRouter';

import HeaderModal from '.';
import EmotionProvider from 'assets/EmotionProvider';

import { products } from 'fixtures/products';

interface Props {
   show?: boolean;
   width?: string;
   data?: typeof products;
}

describe('HeaderModal Component', () => {
   const getComponent = ({ show, width, data }: Props) => {
      const onClick = jest.fn();
      const title = 'Header Modal';

      const result = renderWithRouter(
         <EmotionProvider>
            <button onClick={() => onClick(true)}>show</button>
            <HeaderModal
               data={data}
               title={title}
               width={width}
               show={show}
               onClose={onClick}
            />
         </EmotionProvider>,
      );

      const EmptyContent = result.getByText(title);
      const Buttons = result.getAllByRole('button');
      const ProductImages = () => result.getAllByRole('img');

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
         ProductImages,
         ContentEl,
         clickShowButton,
         clickCloseButton,
         onClick,
      };
   };

   it('render test', () => {
      const { ShowButton, Container } = getComponent({});

      expect(ShowButton).toBeInTheDocument();
      expect(Container).not.toBeVisible();
      expect(Container).not.toHaveClass('show');
      expect(Container).not.toHaveClass('hidden');
   });

   it('className show test', () => {
      const { Container, ContentEl, clickCloseButton, onClick } = getComponent({
         show: true,
      });

      expect(Container).toBeVisible();
      expect(Container).toHaveClass('show');
      expect(ContentEl()).toHaveStyle('width: 380px');

      clickCloseButton();
      expect(onClick).toBeCalledWith(false);
   });

   it('className hidden test', () => {
      const { Container, clickShowButton, onClick } = getComponent({
         show: false,
      });

      expect(Container).not.toBeVisible();
      expect(Container).toHaveClass('hidden');

      clickShowButton();
      expect(onClick).toBeCalledWith(true);
   });

   it('width test', () => {
      const { ContentEl } = getComponent({ show: true, width: '100%' });

      expect(ContentEl()).toHaveStyle('width: 100%');
   });

   describe('data list test', () => {
      it('no data test', () => {
         const { EmptyContent } = getComponent({
            show: true,
            data: [],
         });
         expect(EmptyContent).toBeInTheDocument();
      });

      it('product data test', () => {
         const { ProductImages } = getComponent({
            show: true,
            data: products,
         });
         expect(ProductImages()).toHaveLength(products.length);
      });
   });
});
