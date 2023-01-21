import React from 'react';
import { fireEvent } from '@testing-library/react';
import { useDispatch } from 'react-redux';

import { DELETE_FROM_CART, DELETE_FROM_WISHLIST } from 'redux/actions/types';

import useTypedSelector from 'hooks/useTypedSelector';

import { renderWithRouter } from 'utils/tests/renderWithRouter';

import EmotionProvider from 'assets/EmotionProvider';

import { products } from 'fixtures/products';

import Header from '.';

import MockedFunction = jest.MockedFunction;

describe('Header Component', () => {
   beforeEach(() => {
      _useDispatch.mockImplementation(() => dispatch);
      _useSelector.mockImplementation((selector) =>
         selector({
            cartReducer: { cart: products },
            wishlistReducer: { wishlist: products },
         }),
      );
   });

   const dispatch = jest.fn();

   const _useDispatch = useDispatch as MockedFunction<typeof useDispatch>;
   const _useSelector = useTypedSelector as MockedFunction<
      typeof useTypedSelector
   >;

   const getComponent = () => {
      const { getAllByRole, getByTestId, getByPlaceholderText } =
         renderWithRouter(
            <EmotionProvider>
               <Header />
            </EmotionProvider>,
         );

      const HeaderEl = getByTestId('header');
      const Anchors = getAllByRole('link');
      const Logo = Anchors[0];

      const Buttons = getAllByRole('button');
      const [SearchButton, UserButton, WishButton, CartButton] = Buttons;

      const Modal = getByTestId('header-modal');

      const ModalButtons = Modal.querySelectorAll('button');
      const CloseButton = ModalButtons[0];
      const DeleteButton = ModalButtons[1];
      const SearchInput = () => getByPlaceholderText('Search');

      const clickLogo = () => fireEvent.click(Logo);
      const clickSearchButton = () => fireEvent.click(SearchButton);
      const clickUserButton = () => fireEvent.click(UserButton);
      const clickWishButton = () => fireEvent.click(WishButton);
      const clickCartButton = () => fireEvent.click(CartButton);

      const clickCloseButton = () => fireEvent.click(CloseButton);
      const clickDeleteButton = () => fireEvent.click(DeleteButton);
      const keyDownSearchInput = (keyword: string) =>
         fireEvent.change(SearchInput(), {
            target: { value: keyword },
         });

      return {
         HeaderEl,
         Logo,
         SearchButton,
         UserButton,
         WishButton,
         CartButton,

         Modal,

         clickLogo,
         clickSearchButton,
         clickUserButton,
         clickWishButton,
         clickCartButton,

         clickCloseButton,
         clickDeleteButton,
         keyDownSearchInput,
      };
   };

   it('render test', () => {
      const { Logo, SearchButton, UserButton, WishButton, CartButton } =
         getComponent();

      expect(Logo).toBeInTheDocument();

      expect(SearchButton).toBeInTheDocument();
      expect(UserButton).toBeInTheDocument();
      expect(WishButton).toBeInTheDocument();
      expect(CartButton).toBeInTheDocument();
   });

   it('Button click test', () => {
      const {
         Modal,

         clickSearchButton,
         clickWishButton,
         clickCartButton,

         clickCloseButton,
      } = getComponent();

      expect(Modal).not.toBeVisible();

      clickSearchButton();
      clickWishButton();
      clickCartButton();

      expect(Modal).toBeVisible();

      clickCloseButton();

      expect(Modal).not.toBeVisible();
   });

   it('scroll test', () => {
      const { HeaderEl } = getComponent();

      expect(HeaderEl).toHaveStyle('position: absolute');

      fireEvent.scroll(window, {
         target: { scrollY: HeaderEl.offsetHeight + 1 },
      });
      expect(HeaderEl).toHaveStyle('position: fixed');

      fireEvent.scroll(window, {
         target: { scrollY: HeaderEl.offsetHeight },
      });
      expect(HeaderEl).toHaveStyle('position: absolute');
   });

   describe('cart redux test', () => {
      it('delete product from cart', () => {
         const { clickCartButton, clickDeleteButton } = getComponent();

         clickCartButton();
         clickDeleteButton();
         expect(dispatch).toBeCalledWith({
            type: DELETE_FROM_CART,
            payload: products[0],
         });
      });
   });

   describe('wishlist redux test', () => {
      it('delete product from wishlist', () => {
         const { clickWishButton, clickDeleteButton } = getComponent();

         clickWishButton();
         clickDeleteButton();
         expect(dispatch).toBeCalledWith({
            type: DELETE_FROM_WISHLIST,
            payload: products[0],
         });
      });
   });

   describe('api test', () => {
      it('get search data test', () => {
         const { clickSearchButton, keyDownSearchInput } = getComponent();
         clickSearchButton();
         keyDownSearchInput(products[0].name);
      });
   });
});
