import styled from '@emotion/styled';

import { keyframes, css } from '@emotion/react';

const growDown = keyframes`
  from {
    transform: scaleY(0)
  }

  to {
    transform: scaleY(1)
  }
`;

const growRight = keyframes`
  from {
    transform: scaleX(0)
  }

  to {
    transform: scaleX(1)
  }
`;

const menuStyles = css`
   visibility: hidden;

   padding: 30px 0;

   position: absolute;
   z-index: 9999;

   height: auto;

   background-color: #fff;
   box-shadow: -2px 2px 81px -27px rgb(0 0 0 / 30%);

   > li {
      min-width: 220px;
      padding: 0 30px;
      margin: 5px 0;
      a > {
         margin-bottom: 15px;
      }
   }
`;

const StyledNav = styled.nav`
   padding: 0 15px;
`;

const ThirdMenu = styled.ul`
   ${menuStyles};

   transform: scaleX(0);
   top: 0;
   left: 100%;
`;

const SubMenu = styled.ul`
   ${menuStyles};

   transform: scaleY(0);
   left: -37px;

   > li {
      :hover {
         ${ThirdMenu} {
            visibility: visible;
            transform: scaleX(1);
            transform-origin: top left;
            animation: ${growRight} 0.5s ease-in-out forwards;
         }
      }
   }
`;

const Menu = styled.ul`
   margin: 0;
   padding: 0;
   list-style: outside none none;

   > li {
      position: relative;
      display: inline-block;
      margin-right: 50px;
      text-align: left;

      > a {
         font-weight: 500;
         line-height: 80px;
      }

      :last-of-type {
         margin-right: 0;
      }

      :hover {
         ${SubMenu} {
            visibility: visible;
            transform: scaleY(1);
            transform-origin: top center;
            animation: ${growDown} 0.5s ease-in-out forwards;
         }
      }
   }
`;

export { StyledNav, Menu, SubMenu, ThirdMenu };
