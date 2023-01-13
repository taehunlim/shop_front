import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

import { ThemeProps } from 'assets/emotion';

type InputType = 'input' | 'select' | 'textarea';

type ComponentType<T extends InputType> = React.ComponentProps<T>;

export type InputProps = ComponentType<'input'> &
   ComponentType<'select'> &
   ComponentType<'textarea'> & {
      invalid?: boolean;
   };

const styles = ({
   height,
   type,
   disabled,
   invalid,
   theme,
}: InputProps & ThemeProps) => {
   const invalidStyle = invalid
      ? `1px solid ${theme.fg.danger}`
      : '1px solid #ced4da';

   const disabledStyle = disabled ? 'none' : invalidStyle;
   return css`
      display: block;
      //box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
      width: 100%;
      margin: 0;
      box-sizing: border-box;
      font-size: ${height && `${Number(height) / 35.56}rem`};
      padding: ${type === 'textarea' ? '0.4444444444em' : '0 0.4444444444em'};
      height: ${type === 'textarea' ? 'auto' : '2.2222222222em'};
      color: ${disabled ? '#77797c' : '#9d9fa2'};
      background-color: ${disabled && 'rgba(241, 242, 245, 0.6)'};
      border: ${disabledStyle};
      transition: color 250ms ease-out, border-color 250ms ease-out;
      border-radius: 0.25rem;
      opacity: 0.8;
      color: ${theme.fg.black};

      &:focus {
         border: 1px solid #77797c;
      }

      &[type='checkbox'],
      &[type='radio'] {
         display: inline-block;
         border: 0;
         border-radius: 0;
         width: auto;
         height: auto;
         margin: 0 0.2rem 0 0;
      }
   `;
};
const StyledTextarea = styled.textarea<ComponentType<'textarea'>>`
   ${styles}
`;
const StyledSelect = styled.select<ComponentType<'select'>>`
   ${styles}
`;
const StyledInput = styled.input<ComponentType<'input'>>`
   ${styles}
`;

const styledComponent = { StyledTextarea, StyledSelect, StyledInput };

export default styledComponent;
