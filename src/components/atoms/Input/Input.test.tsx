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

   it('textarea render test', () => {
      const { getByRole } = getComponent('textarea');
      const textarea = getByRole('textbox');

      expect(textarea).toContainElement(textarea);
   });

   it('select render test', () => {
      const { getByRole } = getComponent('select');
      const select = getByRole('combobox');

      expect(select).toContainElement(select);
   });
});
