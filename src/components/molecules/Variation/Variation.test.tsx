import React from 'react';
import { fireEvent, render } from '@testing-library/react';

import EmotionProvider from 'assets/EmotionProvider';

import { products } from 'fixtures/products';

import Variation from '.';

describe('Variation component', () => {
   const { variation } = products[0];

   const onChange = jest.fn();

   const getComponent = () => {
      const { getByTestId } = render(
         <EmotionProvider>
            <Variation variation={variation} onChange={onChange} />
         </EmotionProvider>,
      );

      const ColorContainer = getByTestId('color-container');
      const SizeContainer = getByTestId('size-container');

      const ColorRadios = ColorContainer.querySelectorAll('input');

      const ClickColor = (index: number) => fireEvent.click(ColorRadios[index]);
      const ClickSize = (index: number) =>
         fireEvent.click(SizeContainer.children[index]);

      return {
         ColorContainer,
         SizeContainer,
         ClickColor,
         ClickSize,
      };
   };

   it('render test', () => {
      const { ColorContainer, SizeContainer } = getComponent();

      expect(ColorContainer.childElementCount).toBe(variation.length);
      expect(SizeContainer.childElementCount).toBe(variation[0].size.length);
   });

   it('get sizes for current color test', () => {
      const { SizeContainer, ClickColor } = getComponent();

      variation.forEach(({ size }, i) => {
         ClickColor(i);
         expect(SizeContainer.childElementCount).toBe(size.length);
      });
   });

   it('onChange test', () => {
      const { ClickColor, ClickSize } = getComponent();

      variation.forEach(({ size, color }, colorIndex) => {
         ClickColor(colorIndex);
         expect(onChange).toBeCalledWith({
            size: size[0].name,
            color,
         });

         size.forEach((currentSize, sizeIndex) => {
            ClickSize(sizeIndex);
            expect(onChange).toBeCalledWith({
               size: currentSize.name,
               color,
            });
         });
      });
   });
});
