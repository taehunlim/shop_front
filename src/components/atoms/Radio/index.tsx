import React, { ComponentProps } from 'react';
import styledComponent from './style';

const { StyledRadio } = styledComponent;

function Radio({ id, value, name, ...props }: ComponentProps<'input'>) {
   const inputId = id || `${value}`;
   return (
      <StyledRadio>
         <input id={inputId} type="radio" name={name} {...props} />
         <label htmlFor={inputId} />
      </StyledRadio>
   );
}

export default Radio;
