import React from 'react';
import { fireEvent } from '@testing-library/react';

import { renderWithRouter } from 'utils/tests/renderWithRouter';

import EmotionProvider from 'assets/EmotionProvider';

import Product, { ProductProps } from '.';

import { products } from 'fixtures/products';

type Props = Omit<ProductProps, 'onWish'>;

describe('Product', () => {
   const onWish = jest.fn();
   function getComponent({ product, isWished }: Props) {
      const { getByTestId } = renderWithRouter(
         <EmotionProvider>
            <Product product={product} isWished={isWished} onWish={onWish} />
         </EmotionProvider>,
      );

      const WishButton = getByTestId('wish-button');
      const WishedIcon = () => getByTestId('wished');

      const clickWishButton = () => fireEvent.click(WishButton);

      return { WishedIcon, clickWishButton };
   }

   it('a sale, new test', () => {
      const { WishedIcon } = getComponent({
         product: products[0],
         isWished: true,
      });

      expect(WishedIcon()).toBeInTheDocument;
   });

   it('a sold-out test', () => {
      getComponent({
         product: products[3],
         isWished: false,
      });
   });

   it('onWish test', () => {
      const { clickWishButton } = getComponent({
         product: products[0],
         isWished: false,
      });

      clickWishButton();
      expect(onWish).toBeCalledWith(products[0]);
   });
});
