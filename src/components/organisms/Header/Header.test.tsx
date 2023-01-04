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

      const Modal = getByTestId('header-modal');

      const CartCloseButton = Modal.querySelectorAll('button')[0];

      const clickLogo = () => fireEvent.click(Logo);
      const clickSearchButton = () => fireEvent.click(SearchButton);
      const clickUserButton = () => fireEvent.click(UserButton);
      const clickWishButton = () => fireEvent.click(WishButton);
      const clickCartButton = () => fireEvent.click(CartButton);

      const clickCartCloseButton = () => fireEvent.click(CartCloseButton);

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
         Modal,

         clickSearchButton,
         clickWishButton,
         clickCartButton,

         clickCartCloseButton,
      } = getComponent();

      expect(Modal).not.toBeVisible();

      clickSearchButton();
      clickWishButton();
      clickCartButton();

      expect(Modal).toBeVisible();

      clickCartCloseButton();

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
});
