import React from 'react';
import { render } from '@testing-library/react';

import EmotionProvider from 'assets/EmotionProvider';

import { products } from 'fixtures/products';

import Variation from '.';

describe('Variation component', () => {
   const { variation } = products[0];
   const getComponent = () => {
      const { getByTestId } = render(
         <EmotionProvider>
            <Variation variation={variation} />
         </EmotionProvider>,
      );

      const RadioContainer = getByTestId('radio-container');
      const SizeContainer = getByTestId('size-container');

      return {
         RadioContainer,
         SizeContainer,
      };
   };

   it('render test', () => {
      const { RadioContainer, SizeContainer } = getComponent();

      expect(RadioContainer.childElementCount).toBe(variation.length);
      expect(SizeContainer.childElementCount).toBe(variation[0].size.length);
   });
});
