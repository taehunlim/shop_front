import React from 'react';
import { fireEvent, render } from '@testing-library/react';

import useTypedSelector from 'hooks/useTypedSelector';

import EmotionProvider from 'assets/EmotionProvider';

import { products } from 'fixtures/products';

import ProductModal from '.';

import MockedFunction = jest.MockedFunction;

interface Props {
   isWished: boolean;
}

describe('ProductModal test', () => {
   const product = products[0];

   const _useSelector = useTypedSelector as MockedFunction<
      typeof useTypedSelector
   >;

   _useSelector.mockImplementation((selector) =>
      selector({
         cartReducer: { cart: [] },
         wishlistReducer: { wishlist: [] },
      }),
   );

   const onShow = jest.fn();
   const onWish = jest.fn();

   const getComponent = ({ isWished = false }: Props) => {
      const result = render(
         <EmotionProvider>
            <ProductModal
               show={true}
               onClose={onShow}
               product={product}
               isWished={isWished}
               onWish={onWish}
            />
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
         } = getComponent({
            isWished: false,
         });

         expect(Images).toHaveLength(product.image.length);
         expect(ProductName).toBeInTheDocument();
         expect(Price).toBeInTheDocument();
         expect(Description).toBeInTheDocument();
         expect(CartButton).toBeInTheDocument();
         expect(WishlistButton).toBeInTheDocument();
      });
      it('not added to cart, wishlist', () => {
         const { CartButton, WishlistButton, AddToCart, AddToWishlist } =
            getComponent({
               isWished: false,
            });

         expect(CartButton).toBeInTheDocument();
         expect(WishlistButton).toBeInTheDocument();

         expect(AddToCart()).toBeInTheDocument();
         expect(AddToWishlist()).toBeInTheDocument();
      });

      it('added to cart, wishlist', () => {
         _useSelector.mockImplementation((selector) =>
            selector({
               cartReducer: { cart: [product] },
               wishlistReducer: { wishlist: [] },
            }),
         );

         const {
            CartButton,
            WishlistButton,
            DeleteFromCart,
            DeleteFromWishlist,
         } = getComponent({
            isWished: true,
         });

         expect(CartButton).toBeInTheDocument();
         expect(WishlistButton).toBeInTheDocument();

         expect(DeleteFromCart()).toBeInTheDocument();
         expect(DeleteFromWishlist()).toBeInTheDocument();
      });
   });
});
