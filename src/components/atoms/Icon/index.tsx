import React from 'react';
import styledComponent, { IconStyleProps } from './style';

const { StyledIcon } = styledComponent;

export interface IconProps extends IconStyleProps {
   icon?: string;
}

function Icon({ icon, ...props }: IconProps) {
   const svg = require(`!raw-loader!./icons/${icon}.svg`).default;
   return <StyledIcon {...props} dangerouslySetInnerHTML={{ __html: svg }} />;
}

export default Icon;
