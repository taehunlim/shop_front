import React from 'react';
import { fireEvent } from '@testing-library/react';

import { useDispatch } from 'react-redux';

import useTypedSelector from 'hooks/useTypedSelector';
import { ADD_TO_WISHLIST, DELETE_FROM_WISHLIST } from 'redux/actions/types';

import { renderWithRouter } from 'utils/tests/renderWithRouter';
import EmotionProvider from 'assets/EmotionProvider';
import ProductGrid from '.';

import { products } from 'fixtures/products';

import MockedFunction = jest.MockedFunction;

describe('ProductGrid test', () => {
   beforeEach(() => {
      _useDispatch.mockImplementation(() => dispatch);
      _useSelector.mockImplementation((selector) =>
         selector({
            cartReducer: { cart: [] },
            wishlistReducer: { wishlist: [] },
         }),
      );
   });

   const dispatch = jest.fn();
   const _useDispatch = useDispatch as MockedFunction<typeof useDispatch>;
   const _useSelector = useTypedSelector as MockedFunction<
      typeof useTypedSelector
   >;

   function getComponent() {
      const { container, getAllByRole, getAllByText } = renderWithRouter(
         <EmotionProvider>
            <ProductGrid />
         </EmotionProvider>,
      );

      const Images = getAllByRole('img');
      const Buttons = container.querySelectorAll('button');
      const ProductName = (name: string) => getAllByText(name);

      const clickWishButtons = () => {
         Buttons.forEach((button, i) => {
            if (i % 2 === 0) {
               fireEvent.click(button);
            }
         });
      };

      return {
         Images,
         Buttons,
         ProductName,
         clickWishButtons,
      };
   }

   it('render test', () => {
      const { Images } = getComponent();

      expect(Images).toHaveLength(products.length);
   });

   describe('redux test', () => {
      it('add product to wishlist', () => {
         const { clickWishButtons } = getComponent();

         clickWishButtons();

         products.forEach((product) => {
            expect(dispatch).toBeCalledWith({
               type: ADD_TO_WISHLIST,
               payload: product,
            });
         });
      });

      it('delete product from wishlist', () => {
         _useSelector.mockImplementation((selector) =>
            selector({
               cartReducer: { cart: [] },
               wishlistReducer: { wishlist: products },
            }),
         );
         const { clickWishButtons } = getComponent();

         clickWishButtons();

         products.forEach((product) => {
            expect(dispatch).toBeCalledWith({
               type: DELETE_FROM_WISHLIST,
               payload: product,
            });
         });
      });
   });

   it('quick view test', () => {
      const { Buttons, ProductName } = getComponent();

      fireEvent.click(Buttons[1]);
      expect(ProductName(products[0].name)).toHaveLength(2);

      fireEvent.click(Buttons[3]);
      expect(ProductName(products[1].name)).toHaveLength(2);

      fireEvent.click(Buttons[5]);
      expect(ProductName(products[2].name)).toHaveLength(2);
   });
});
