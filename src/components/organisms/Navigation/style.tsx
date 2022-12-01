import styled from '@emotion/styled';

import { keyframes, css } from '@emotion/react';
import { ThemeProps } from 'assets/emotion';

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

const menuStyles = ({ theme }: ThemeProps) => css`
   visibility: hidden;

   padding: 30px 0;

   position: absolute;
   z-index: 9999;

   height: auto;

   background-color: ${theme.fg.black};

   > li {
      min-width: 220px;
      padding: 0 30px;
      margin: 5px 0;
      > a {
         color: ${theme.fg.gray};
         margin-bottom: 15px;
      }
   }
`;

const lineStyles = ({ theme }: ThemeProps) => css`
   position: relative;
   ::after {
      content: '';
      position: absolute;

      left: auto;
      right: 0;
      bottom: 0;
      width: 0;
      height: 1px;

      transition: 0.3s;

      background-color: ${theme.fg.white};
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

   > li {
      > a {
         ${lineStyles};
      }
      :hover {
         > a {
            color: ${({ theme }) => theme.fg.white};

            ::after {
               left: 0;
               width: 100%;
            }
         }
      }
   }
`;

const SubMenu = styled.ul`
   ${menuStyles};

   transform: scaleY(0);
   left: -37px;

   > li {
      > a {
         ${lineStyles};
      }
      :hover {
         ${ThirdMenu} {
            visibility: visible;
            transform: scaleX(1);
            transform-origin: top left;
            animation: ${growRight} 0.5s ease-in-out forwards;
         }
         > a {
            color: ${({ theme }) => theme.fg.white};
            ::after {
               left: 0;
               width: 100%;
            }
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

      > a {
         ${lineStyles};
         line-height: 80px;

         font-weight: 500;
         text-align: left;

         ::after {
            bottom: 30px;
            background-color: ${({ theme }) => theme.fg.black};
         }
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
         > a {
            ::after {
               left: 0;
               width: 100%;
            }
         }
      }
   }
`;

export { StyledNav, Menu, SubMenu, ThirdMenu };
