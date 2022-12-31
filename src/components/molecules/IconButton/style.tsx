import styled from '@emotion/styled';

import Button from 'components/atoms/Button';

export interface IconButtonProps {
   width?: number;
   height?: number;
}

const StyledButton = styled(Button)<IconButtonProps>`
   width: ${({ width }) => width || 'auto'};
   height: ${({ height }) => height || 'auto'};
   padding: 0;
   background-color: ${({ theme }) => theme.fg.white};
`;

export { StyledButton };
