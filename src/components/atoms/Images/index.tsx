import styled from '@emotion/styled';
import { css } from '@emotion/react';

const imgStyles = css`
   img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      object-fit: contain;
      height: auto;
   }
`;

export const ProductImgWrapper = styled.div`
   position: relative;
   width: 100%;
   padding-top: ${(100 * 4) / 3}%;

   ${imgStyles}
`;
