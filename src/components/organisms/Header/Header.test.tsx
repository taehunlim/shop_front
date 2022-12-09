import React from 'react';
import { fireEvent } from '@testing-library/react';

import { renderWithRouter } from 'utils/tests/renderWithRouter';
import EmotionProvider from 'assets/EmotionProvider';
import Header from '.';

describe('Header Component', () => {
   const getComponent = () => {
      const { getAllByRole, getByTestId } = renderWithRouter(
         <EmotionProvider>
            <Header />
         </EmotionProvider>,
      );

      const HeaderEl = getByTestId('header');
      const Anchors = getAllByRole('link');
      const Logo = Anchors[0];

      const Buttons = getAllByRole('button');
      const [SearchButton, UserButton, WishButton, CartButton] = Buttons;

      const SearchModal = getByTestId('search-modal');
      const WishModal = getByTestId('wish-modal');
      const CartModal = getByTestId('cart-modal');

      const SearchCloseButton = SearchModal.querySelectorAll('button')[0];
      const WishCloseButton = WishModal.querySelectorAll('button')[0];
      const CartCloseButton = CartModal.querySelectorAll('button')[0];

      const clickLogo = () => fireEvent.click(Logo);
      const clickSearchButton = () => fireEvent.click(SearchButton);
      const clickUserButton = () => fireEvent.click(UserButton);
      const clickWishButton = () => fireEvent.click(WishButton);
      const clickCartButton = () => fireEvent.click(CartButton);

      const clickSearchCloseButton = () => fireEvent.click(SearchCloseButton);
      const clickWishCloseButton = () => fireEvent.click(WishCloseButton);
      const clickCartCloseButton = () => fireEvent.click(CartCloseButton);

      return {
         HeaderEl,
         Logo,
         SearchButton,
         UserButton,
         WishButton,
         CartButton,

         SearchModal,
         WishModal,
         CartModal,

         clickLogo,
         clickSearchButton,
         clickUserButton,
         clickWishButton,
         clickCartButton,
         clickSearchCloseButton,
         clickWishCloseButton,
         clickCartCloseButton,
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
         SearchModal,
         WishModal,
         CartModal,

         clickSearchButton,
         clickWishButton,
         clickCartButton,

         clickSearchCloseButton,
         clickWishCloseButton,
         clickCartCloseButton,
      } = getComponent();

      expect(SearchModal).not.toBeVisible();
      expect(WishModal).not.toBeVisible();
      expect(CartModal).not.toBeVisible();

      clickSearchButton();
      clickWishButton();
      clickCartButton();

      expect(SearchModal).toBeVisible();
      expect(WishModal).toBeVisible();
      expect(CartModal).toBeVisible();

      clickSearchCloseButton();
      clickWishCloseButton();
      clickCartCloseButton();

      expect(SearchModal).not.toBeVisible();
      expect(WishModal).not.toBeVisible();
      expect(CartModal).not.toBeVisible();
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
});
