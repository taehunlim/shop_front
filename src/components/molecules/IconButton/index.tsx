import React from 'react';

import { ButtonProps } from 'components/atoms/Button';
import Icon, { IconProps } from 'components/atoms/Icon';

import { StyledButton, IconButtonProps } from './style';

type Props = IconButtonProps & ButtonProps & IconProps;

function IconButton({ icon, width, height, padding, ...props }: Props) {
   return (
      <StyledButton {...props} padding={padding}>
         <Icon icon={icon} width={width} height={height} />
      </StyledButton>
   );
}

export default IconButton;
