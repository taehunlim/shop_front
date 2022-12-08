import styled from '@emotion/styled';

import { revealingStyle } from './animations';

export interface ContentProps {
   width?: string;
}

const Content = styled.div<ContentProps>`
   text-align: initial;
   background: #fff;
   padding: 20px;
   width: ${({ width }) => width || '380px'};

   height: 100%;

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

   text-align: end;
`;

const Container = styled.div`
   position: fixed;
   left: 0;
   top: 0;
   display: none;
   height: 100%;
   width: 100%;
   z-index: 1;
   /* hidden 처리 */
   transform: scale(0);

   ${revealingStyle(Wrapper, Content)}
`;

const styledComponent = {
   Container,
   Wrapper,
   CloseButton,
   Content,
};

export default styledComponent;
