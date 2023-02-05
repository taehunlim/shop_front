import React, { ComponentProps } from 'react';
import styledComponent from './style';

const { StyledRadio } = styledComponent;

interface Props extends ComponentProps<'input'> {
   color: string;
}

function Radio({ id, value, name, color, ...props }: Props) {
   return (
      <StyledRadio color={color}>
         <input id={id || `${value}`} type="radio" name={name} {...props} />
         <label htmlFor={id || `${value}`} />
      </StyledRadio>
   );
}

export default Radio;
