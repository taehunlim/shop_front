import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { matchers } from '@emotion/jest';

import EmotionProvider from 'assets/EmotionProvider';
import Button from '.';

import theme from 'assets/theme';

expect.extend(matchers);

describe('Button', () => {
   const onClick = jest.fn();

   function getButton() {
      return render(
         <EmotionProvider>
            <Button primary onClick={onClick}>
               btn
            </Button>
         </EmotionProvider>,
      );
   }

   it('render test', () => {
      const { container } = getButton();

      expect(container).toHaveTextContent('btn');
   });

   it('onClick test', () => {
      const { getByText } = getButton();
      const button = getByText(/btn/i);

      fireEvent.click(button);
      expect(onClick).toBeCalled();
   });

   it('bootstrap color test', () => {
      const { getByText } = getButton();

      const button = getByText(/btn/i);

      expect(button).toHaveStyleRule(`background-color`, theme.bg.primary);
   });
});
