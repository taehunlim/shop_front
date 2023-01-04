import styled from '@emotion/styled';
import { css, keyframes } from '@emotion/react';

interface StyledHeaderProps {
   isSticky: boolean;
}

const fadeInDown = keyframes`
   0% {
      transform: translate3d(0,-100%,0);
  
      opacity: 0;
   }
   100% {
      transform: translateZ(0);
  
      opacity: 1;
   }
`;

const StyledHeader = styled.header<StyledHeaderProps>`
   position: absolute;
   z-index: 9;
   top: 0;
   left: 0;
   width: 100%;
   align-items: center;
   justify-content: space-between;
   display: flex;

   ${({ isSticky }) => {
      if (isSticky) {
         return css`
            position: fixed;
            z-index: 999;
            top: 0;
            left: 0;
            width: 100%;
            transition: all 0.3s;
            animation: 700ms ease-in-out 0s normal none 1 running ${fadeInDown};
            background-color: #fff;
            box-shadow: 0 2px 5px rgb(0 0 0 / 20%);
         `;
      }
   }};
`;

const Container = styled.div`
   width: 95%;
   display: flex;
   align-items: center;
   flex-wrap: wrap;
   margin: auto;

   justify-content: space-between;
`;

const LogoWrapper = styled.div`
   align-items: center;
   padding-right: 15px;
   display: flex;
`;

const IconContainer = styled.div`
   padding-left: 15px;

   li {
      display: inline-block;
      margin-right: 30px;

      :last-of-type {
         margin-right: 0;
      }
   }

   button,
   a {
      padding: 0;

      span {
         pointer-events: none;
      }
   }
`;

export { StyledHeader, Container, LogoWrapper, IconContainer };
