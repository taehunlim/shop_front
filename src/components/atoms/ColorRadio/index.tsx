import React, { ComponentProps } from 'react';
import styledComponent from './style';

const { StyledRadio } = styledComponent;

interface Props extends ComponentProps<'input'> {
   color: string;
}

function Radio({ id, name, color, ...props }: Props) {
   return (
      <StyledRadio color={color}>
         <input id={id} type="radio" name={name} {...props} />
         <label htmlFor={id} />
      </StyledRadio>
   );
}

export default Radio;
