import React, { ComponentProps } from 'react';
import styledComponent from './style';

const { StyledRadio } = styledComponent;

function Radio({ id, name, ...props }: ComponentProps<'input'>) {
   return (
      <StyledRadio>
         <input id={id} type="radio" name={name} {...props} />
         <label htmlFor={id} />
      </StyledRadio>
   );
}

export default Radio;
