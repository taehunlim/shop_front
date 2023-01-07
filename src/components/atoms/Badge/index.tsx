import React, { ReactNode } from 'react';

import { StyledBadge, StyledSup } from './style';

interface Props {
   count: number;

   children: ReactNode;
}

function Badge({ count, children, ...props }: Props) {
   return (
      <StyledBadge {...props}>
         {children}
         {Number(count) > 0 && <StyledSup> {count} </StyledSup>}
      </StyledBadge>
   );
}

export default Badge;
