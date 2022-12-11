import styled from '@emotion/styled';
import { css } from '@emotion/react';

interface WidthProps {
   width?: string | number;
}

const ButtonContainer = styled.div`
   opacity: 0;
   transition: 0.3s;

   padding: 0 20px;

   display: flex;
   justify-content: space-between;
   width: 100%;

   position: absolute;
   top: 50%;
   transform: translateY(-50%);

   button {
      color: #ffffff;
   }
`;

const SlideContainer = styled.div`
   overflow: hidden;
`;

const Wrapper = styled.div`
   display: flex;
   width: 100%;
   height: 100%;
`;

const SlideItem = styled.div`
   display: flex;
   flex-shrink: 0;

   width: 100%;
   height: 100%;

   img {
      object-fit: contain;
      height: auto;
   }
`;

const Container = styled.div<WidthProps>`
   position: relative;
   height: 100%;

   display: flex;
   align-items: center;
   justify-content: center;

   ${({ width }) => {
      if (!width || typeof width === 'string') {
         return css`
            container-type: inline-size;
         `;
      }
   }}

   :hover {
      ${ButtonContainer} {
         opacity: 1;
      }
   }
`;

export { Container, SlideContainer, Wrapper, SlideItem, ButtonContainer };
