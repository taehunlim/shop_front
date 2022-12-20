import React from 'react';
import { BootstrapColorProps } from 'assets/emotion';

import styledComponent from './style';

const { StyledButton } = styledComponent;

type ButtonProps = StyleProps & {
   [key in keyof BootstrapColorProps]?: boolean;
};

interface StyleProps extends React.ComponentProps<'button'> {
   height?: number;
}

function Button({ type, height, ...props }: ButtonProps) {
   return <StyledButton height={height} {...props} type={type} />;
}

export default Button;
