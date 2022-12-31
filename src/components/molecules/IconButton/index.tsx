import React from 'react';

import { ButtonProps } from 'components/atoms/Button';
import Icon from 'components/atoms/Icon';

import { StyledButton, IconButtonProps } from './style';

type Props = IconButtonProps &
   ButtonProps & {
      icon: string;
   };

function IconButton({ icon, ...props }: Props) {
   return (
      <StyledButton {...props}>
         <Icon icon={icon} />
      </StyledButton>
   );
}

export default IconButton;
