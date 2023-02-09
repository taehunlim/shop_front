import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { useDispatch } from 'react-redux';

import {
   ADD_TO_CART,
   ADD_TO_WISHLIST,
   DELETE_FROM_CART,
   DELETE_FROM_WISHLIST,
} from 'redux/actions/types';

import useTypedSelector from 'hooks/useTypedSelector';

import EmotionProvider from 'assets/EmotionProvider';

import { products } from 'fixtures/products';

import ProductModal from '.';

import MockedFunction = jest.MockedFunction;

describe('ProductModal test', () => {
   beforeEach(() => {
      _useDispatch.mockImplementation(() => dispatch);
      _useSelector.mockImplementation((selector) =>
         selector({
            cartReducer: { cart: [] },
            wishlistReducer: { wishlist: [] },
         }),
      );
   });

   const product = products[0];

   const onShow = jest.fn();
   const dispatch = jest.fn();

   const _useDispatch = useDispatch as MockedFunction<typeof useDispatch>;
   const _useSelector = useTypedSelector as MockedFunction<
      typeof useTypedSelector
   >;

   const getComponent = () => {
      const result = render(
         <EmotionProvider>
            <ProductModal show={true} onClose={onShow} product={product} />
         </EmotionProvider>,
      );

      const { getByTestId, getAllByRole, getByText } = result;

      const Container = getByTestId('container');
      const Images = getAllByRole('img');
      const ProductName = getByText(product.name);
      const Description = getByText(product.fullDescription);
      const Price = getByText(`$${product.price}`);

      const CartButton = getByTestId('cart-button');
      const WishlistButton = getByTestId('wish-button');

      const clickCartButton = () => fireEvent.click(CartButton);
      const clickWishlistButton = () => fireEvent.click(WishlistButton);

      // Variation component data-testid
      const ColorContainer = getByTestId('color-container');
      const SizeContainer = getByTestId('size-container');
      const ColorRadios = ColorContainer.querySelectorAll('input');

      const ClickColor = (index: number) => fireEvent.click(ColorRadios[index]);
      const ClickSize = (index: number) =>
         fireEvent.click(SizeContainer.children[index]);

      return {
         Container,
         Images,
         ProductName,
         Price,
         Description,
         CartButton,
         WishlistButton,

         clickCartButton,
         clickWishlistButton,
         ClickColor,
         ClickSize,
      };
   };

   describe('render test', () => {
      it('common test', () => {
         const {
            Images,
            ProductName,
            Price,
            Description,
            CartButton,
            WishlistButton,
         } = getComponent();

         expect(Images).toHaveLength(product.image.length);
         expect(ProductName).toBeInTheDocument();
         expect(Price).toBeInTheDocument();
         expect(Description).toBeInTheDocument();
         expect(CartButton).toBeInTheDocument();
         expect(WishlistButton).toBeInTheDocument();
      });
      it('not added to cart, wishlist', () => {
         const { CartButton, WishlistButton } = getComponent();

         expect(CartButton).toBeInTheDocument();
         expect(WishlistButton).toBeInTheDocument();
      });

      it('added to cart, wishlist', () => {
         _useSelector.mockImplementation((selector) =>
            selector({
               cartReducer: { cart: [product] },
               wishlistReducer: { wishlist: [product] },
            }),
         );

         const { CartButton, WishlistButton } = getComponent();

         expect(CartButton).toBeInTheDocument();
         expect(WishlistButton).toBeInTheDocument();
      });

      it('out of stock button test', () => {
         const { ClickColor, ClickSize, CartButton } = getComponent();

         const { variation } = product;
         const coloIndex = variation.findIndex((color) => {
            const size = color.size.filter((size) => size.stock === 0);
            return size[0]?.stock === 0;
         });

         const sizeIndex = variation[coloIndex].size.findIndex(
            (size) => size.stock === 0,
         );

         ClickColor(coloIndex);
         ClickSize(sizeIndex);

         expect(CartButton.innerHTML).toBe('OUT OF STOCK');
      });
   });

   describe('cart redux test', () => {
      it('add product to cart', () => {
         const { clickCartButton } = getComponent();

         clickCartButton();

         expect(dispatch).toBeCalledWith({
            type: ADD_TO_CART,
            payload: product,
         });
      });

      it('delete product from cart', () => {
         _useSelector.mockImplementation((selector) =>
            selector({
               cartReducer: { cart: [product] },
               wishlistReducer: { wishlist: [] },
            }),
         );

         const { clickCartButton } = getComponent();

         clickCartButton();

         expect(dispatch).toBeCalledWith({
            type: DELETE_FROM_CART,
            payload: product,
         });
      });
   });

   describe('wishlist redux test', () => {
      it('add product to wishlist', () => {
         const { clickWishlistButton } = getComponent();

         clickWishlistButton();

         expect(dispatch).toBeCalledWith({
            type: ADD_TO_WISHLIST,
            payload: product,
         });
      });

      it('delete product from wishlist', () => {
         _useSelector.mockImplementation((selector) =>
            selector({
               cartReducer: { cart: [] },
               wishlistReducer: { wishlist: [product] },
            }),
         );

         const { clickWishlistButton } = getComponent();

         clickWishlistButton();

         expect(dispatch).toBeCalledWith({
            type: DELETE_FROM_WISHLIST,
            payload: product,
         });
      });
   });
});
