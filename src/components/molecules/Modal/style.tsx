import styled from '@emotion/styled';
import { css } from '@emotion/react';

import { basicStyle } from './animations/basic';
import { sidebarStyle } from './animations/sidebar';

export interface ContentProps {
   width?: string;
   height?: string;
}

export interface ContainerProps {
   modalStyle?: 'sidebar';
}

const Content = styled.div<ContentProps>`
   text-align: initial;
   background: #fff;
   /* padding: 20px; */
   width: ${({ width }) => width || '380px'};

   min-height: ${({ height }) => height || '600px'};

   display: inline-block;
   border-radius: 3px;
   position: relative;

   h2 {
      font-size: 25px;
      line-height: 25px;
      margin-bottom: 15px;
   }

   p {
      font-size: 18px;
      line-height: 22px;
   }
`;

const CloseButton = styled.button`
   position: absolute;
   z-index: 9;
   right: 15px;
   top: 20px;
   cursor: pointer;
   color: ${({ theme }) => theme.fg.black};
`;

const Wrapper = styled.div`
   display: table-cell;
   background: rgba(0, 0, 0, 0.8);
   text-align: center;
   vertical-align: middle;

   text-align: center;
`;

const Container = styled.div<ContainerProps>`
   position: fixed;
   left: 0;
   top: 0;
   display: table;
   visibility: hidden;
   height: 100%;
   width: 100%;
   z-index: 999;
   /* hidden 처리 */
   transform: scale(0);

   ${basicStyle(Wrapper, Content)};

   ${({ modalStyle }) => {
      if (modalStyle === 'sidebar')
         return css`
            ${sidebarStyle(Wrapper, Content)}
            ${Wrapper} {
               text-align: end;
            }
            ${Content} {
               height: 100%;
            }
         `;
   }}
`;

const styledComponent = {
   Container,
   Wrapper,
   CloseButton,
   Content,
};

export default styledComponent;
