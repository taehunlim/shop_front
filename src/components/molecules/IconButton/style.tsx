import styled from '@emotion/styled';

import Button from 'components/atoms/Button';

export interface IconButtonProps {
   padding?: string;
}

const StyledButton = styled(Button)<IconButtonProps>`
   width: auto;
   height: auto;
   padding: ${({ padding }) => padding || 0};
   border: none;

   span {
      pointer-events: none;
   }

   &:hover,
   &:focus,
   &:active {
      border: none;
   }
`;

export { StyledButton };
