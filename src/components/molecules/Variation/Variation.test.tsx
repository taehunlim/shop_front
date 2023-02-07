import React from 'react';
import { fireEvent, render } from '@testing-library/react';

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

      const ColorContainer = getByTestId('color-container');
      const SizeContainer = getByTestId('size-container');

      const ColorRadios = ColorContainer.querySelectorAll('input');

      const ClickColor = (index: number) => fireEvent.click(ColorRadios[index]);

      return {
         ColorContainer,
         SizeContainer,
         ClickColor,
      };
   };

   it('render test', () => {
      const { ColorContainer, SizeContainer } = getComponent();

      expect(ColorContainer.childElementCount).toBe(variation.length);
      expect(SizeContainer.childElementCount).toBe(variation[0].size.length);
   });

   it('get sizes for current color test', () => {
      const { SizeContainer, ClickColor } = getComponent();
      let colorIndex = 0;
      expect(SizeContainer.childElementCount).toBe(
         variation[colorIndex].size.length,
      );

      colorIndex = 1;
      ClickColor(colorIndex);
      expect(SizeContainer.childElementCount).toBe(
         variation[colorIndex].size.length,
      );

      colorIndex = 2;
      ClickColor(colorIndex);
      expect(SizeContainer.childElementCount).toBe(
         variation[colorIndex].size.length,
      );
   });
});
