import styled from '@emotion/styled';
import { css } from '@emotion/react';

import { ThemeProps } from 'assets/emotion';

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

      background-color: ${theme.fg.black};
   }
   :hover {
      ::after {
         left: 0;
         width: 100%;
      }
   }
`;

const Container = styled.div`
   height: fit-content;
   margin: 0 30px;
`;

const BannerContainer = styled.div`
   position: relative;
   overflow: hidden;
   width: 100%;
   padding-top: ${(320 / 560) * 100}%;

   img {
      top: 0;
      position: absolute;
      width: 100%;
      transition: 0.8s;
   }

   :hover {
      img {
         transform: scale(1.2);
      }
   }
`;

const Content = styled.div`
   position: absolute;
   left: 10%;
   top: 50%;
   transform: translateY(-50%);

   p {
      font-size: 28px;
      margin-bottom: 15px;
   }

   a {
      ${lineStyles}
   }
`;

export { Container, BannerContainer, Content };
