import React from 'react';
import { fireEvent } from '@testing-library/react';

import { renderWithRouter } from 'utils/tests/renderWithRouter';

import HeaderModal from '.';
import EmotionProvider from 'assets/EmotionProvider';

import { products } from 'fixtures/products';

interface Props {
   show?: boolean;
   width?: string;
   title?: string;
   data?: typeof products;
}

describe('HeaderModal Component', () => {
   const onClick = jest.fn();
   const onSearch = jest.fn();
   const onDelete = jest.fn();

   const getComponent = ({
      show,
      width,
      title = 'Header Modal',
      data,
   }: Props) => {
      const result = renderWithRouter(
         <EmotionProvider>
            <button onClick={() => onClick(true)}>show</button>
            <HeaderModal
               data={data}
               title={title}
               width={width}
               show={show}
               onClose={onClick}
               onSearch={onSearch}
               onDelete={onDelete}
            />
         </EmotionProvider>,
      );

      const EmptyContent = result.getByText(title);
      const Buttons = result.getAllByRole('button');
      const ProductImages = () => result.getAllByRole('img');
      const SearchInput = () => result.getByPlaceholderText('Search');

      const ShowButton = Buttons[0];
      const CloseButton = Buttons[1];
      const DeleteButton = Buttons[2];
      const Container = ShowButton.nextElementSibling;
      const ContentEl = () => CloseButton.parentElement;

      const clickShowButton = () => fireEvent.click(ShowButton);
      const clickCloseButton = () => fireEvent.click(CloseButton);
      const keyDownSearchInput = (keyword: string) =>
         fireEvent.change(SearchInput(), {
            target: { value: keyword },
         });
      const clickDeleteButton = () => fireEvent.click(DeleteButton);

      return {
         EmptyContent,
         ShowButton,
         Container,
         ProductImages,
         SearchInput,
         ContentEl,
         clickShowButton,
         clickCloseButton,
         keyDownSearchInput,
         clickDeleteButton,
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
      const { Container, ContentEl, clickCloseButton } = getComponent({
         show: true,
      });

      expect(Container).toBeVisible();
      expect(Container).toHaveClass('show');
      expect(ContentEl()).toHaveStyle('width: 380px');

      clickCloseButton();
      expect(onClick).toBeCalledWith(false);
   });

   it('className hidden test', () => {
      const { Container, clickShowButton } = getComponent({
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

      it('onSearch test', () => {
         const { SearchInput, keyDownSearchInput } = getComponent({
            title: 'Search',
         });

         expect(SearchInput()).toBeInTheDocument();

         keyDownSearchInput(products[0].name);
         expect(onSearch).toBeCalledWith(products[0].name);
      });

      it('onDelete test', () => {
         const { clickDeleteButton } = getComponent({
            show: true,
            data: products,
         });

         clickDeleteButton();
         expect(onDelete).toBeCalledWith(products[0]);
      });
   });
});
