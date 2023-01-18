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
      const Buttons = getAllByRole('button');

      const ProductName = getByText(product.name);
      const Description = getByText(product.fullDescription);
      const Price = getByText(`$${product.price}`);

      const CartButton = Buttons[3];
      const WishlistButton = Buttons[4];

      const AddToCart = () => getByText('ADD TO CART');
      const DeleteFromCart = () => getByText('DELETE FROM CART');
      const AddToWishlist = () => getByTestId('wish-button');
      const DeleteFromWishlist = () => getByTestId('wished-button');

      const clickCartButton = () => fireEvent.click(CartButton);
      const clickWishlistButton = () => fireEvent.click(WishlistButton);

      return {
         Container,
         Images,
         ProductName,
         Price,
         Description,
         CartButton,
         WishlistButton,

         AddToCart,
         DeleteFromCart,
         AddToWishlist,
         DeleteFromWishlist,

         clickCartButton,
         clickWishlistButton,
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
         const { CartButton, WishlistButton, AddToCart, AddToWishlist } =
            getComponent();

         expect(CartButton).toBeInTheDocument();
         expect(WishlistButton).toBeInTheDocument();

         expect(AddToCart()).toBeInTheDocument();
         expect(AddToWishlist()).toBeInTheDocument();
      });

      it('added to cart, wishlist', () => {
         _useSelector.mockImplementation((selector) =>
            selector({
               cartReducer: { cart: [product] },
               wishlistReducer: { wishlist: [product] },
            }),
         );

         const {
            CartButton,
            WishlistButton,
            DeleteFromCart,
            DeleteFromWishlist,
         } = getComponent();

         expect(CartButton).toBeInTheDocument();
         expect(WishlistButton).toBeInTheDocument();

         expect(DeleteFromCart()).toBeInTheDocument();
         expect(DeleteFromWishlist()).toBeInTheDocument();
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
