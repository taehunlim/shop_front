import React from 'react';
import { fireEvent } from '@testing-library/react';

import { renderWithRouter } from 'utils/tests/renderWithRouter';

import EmotionProvider from 'assets/EmotionProvider';

import Product, { ProductProps } from '.';

import { products } from 'fixtures/products';

type Props = Omit<ProductProps, 'onWish' | 'onQuickView'>;

describe('Product', () => {
   const onWish = jest.fn();
   const onQuickView = jest.fn();
   function getComponent({ product, isWished }: Props) {
      const { getByTestId } = renderWithRouter(
         <EmotionProvider>
            <Product
               product={product}
               isWished={isWished}
               onWish={onWish}
               onQuickView={onQuickView}
            />
         </EmotionProvider>,
      );

      const WishButton = () => getByTestId('wish-button');
      const QuickViewButton = getByTestId('quick-view-button');

      const WishedIcon = () => getByTestId('wished-button');

      const clickWishButton = () => fireEvent.click(WishButton());
      const clickQuickViewButton = () => fireEvent.click(QuickViewButton);

      return { WishedIcon, clickWishButton, clickQuickViewButton };
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

   it('onQuickView test', () => {
      const { clickQuickViewButton } = getComponent({
         product: products[0],
         isWished: false,
      });

      clickQuickViewButton();
      expect(onQuickView).toBeCalledWith(products[0]);
   });
});
