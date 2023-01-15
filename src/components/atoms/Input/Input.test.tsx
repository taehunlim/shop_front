import React from 'react';
import { render } from '@testing-library/react';

import EmotionProvider from 'assets/EmotionProvider';
import Input from './index';

describe('Input', () => {
   function getComponent(type?: string) {
      return render(
         <EmotionProvider>
            <Input type={type} />
         </EmotionProvider>,
      );
   }

   it('input render test', () => {
      const { getByRole } = getComponent();
      const input = getByRole('textbox');

      expect(input).toContainElement(input);
   });
});
