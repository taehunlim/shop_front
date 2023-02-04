import React from 'react';
import { fireEvent, render } from '@testing-library/react';

import EmotionProvider from 'assets/EmotionProvider';

import Quantity from '.';

describe('Quantity component', () => {
   const getComponent = () => {
      const { getByRole, getByTestId } = render(
         <EmotionProvider>
            <Quantity stock={3} />
         </EmotionProvider>,
      );

      const DecreaseButton = getByTestId('decrease-button');
      const IncreaseButton = getByTestId('increase-button');
      const Input = getByRole('textbox') as HTMLInputElement;

      const clickDecreaseButton = () => fireEvent.click(DecreaseButton);
      const clickIncreaseButton = () => fireEvent.click(IncreaseButton);
      const keyDownInput = (value: string) =>
         fireEvent.change(Input, {
            target: {
               value,
            },
         });

      return {
         DecreaseButton,
         IncreaseButton,
         Input,

         clickDecreaseButton,
         clickIncreaseButton,
         keyDownInput,
      };
   };

   it('render test', () => {
      const { DecreaseButton, IncreaseButton, Input } = getComponent();

      expect(DecreaseButton).toBeInTheDocument();
      expect(IncreaseButton).toBeInTheDocument();
      expect(Input).toBeInTheDocument();
      expect(Input.value).toBe('1');
   });

   it('increase test', () => {
      const { clickIncreaseButton, Input } = getComponent();

      expect(Input.value).toBe('1');

      clickIncreaseButton();
      expect(Input.value).toBe('2');

      clickIncreaseButton();
      expect(Input.value).toBe('3');

      clickIncreaseButton();
      expect(Input.value).toBe('3');
   });

   it('decrease test', () => {
      const { clickDecreaseButton, Input } = getComponent();

      expect(Input.value).toBe('1');

      clickDecreaseButton();
      expect(Input.value).toBe('0');

      clickDecreaseButton();
      expect(Input.value).toBe('0');
   });

   it('quantity input test', () => {
      const { keyDownInput, Input } = getComponent();

      expect(Input.value).toBe('1');

      keyDownInput('2');
      expect(Input.value).toBe('2');

      keyDownInput('9');
      expect(Input.value).toBe('3');

      keyDownInput('5');
      expect(Input.value).toBe('3');

      keyDownInput('asdkjfnsadkfjn');
      expect(Input.value).toBe('3');
   });
});
