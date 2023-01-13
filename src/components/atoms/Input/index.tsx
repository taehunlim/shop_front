import React from 'react';

import styledComponent, { InputProps } from './Input.style';

const { StyledTextarea, StyledSelect, StyledInput } = styledComponent;

function Input(props: InputProps) {
   const { type } = props;

   if (type === 'textarea') {
      return <StyledTextarea {...props} />;
   }
   if (type === 'select') {
      return <StyledSelect {...props} />;
   }

   return <StyledInput {...props} />;
}

export default Input;
