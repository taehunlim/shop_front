import styled from '@emotion/styled';
import { css } from '@emotion/react';

import Button from 'components/atoms/Button';

export type PriceType = `${number}`;
interface PriceProps {
   discountedPrice: PriceType;
}

const ProductImgWrapper = styled.div`
   position: relative;
   width: 100%;
   padding-top: ${(100 * 4) / 3}%;

   img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      object-fit: contain;
      height: auto;
   }
`;

const ButtonContainer = styled.div`
   display: inline-grid;
   gap: 5px;

   position: absolute;
   top: 20px;
   right: 20px;

   visibility: hidden;
   transition: 0.5s;
   opacity: 0;
   transform: translateY(30px);
`;

const IconButton = styled(Button)`
   width: 40px;
   height: 40px;
   padding: 0;
   background-color: ${({ theme }) => theme.fg.white};
`;

const Content = styled.div`
   margin-top: 25px;
`;

const ContentTitle = styled.div`
   position: relative;
`;

const Title = styled.h3`
   font-size: 18px;

   font-weight: 400;
   margin: 0 0 10px;

   visibility: visible;
   transition: 0.5s;
   opacity: 1;
   transform: translateY(0);
`;

const HoverText = styled.span`
   position: absolute;
   top: 0;
   left: 0;

   display: inline-block;
   font-weight: 500;
   margin: 0 0 10px;
   color: ${({ theme }) => theme.fg.red};

   visibility: hidden;
   transition: 0.5s;
   opacity: 0;
   transform: translateY(20px);

   ::before {
      content: '+ ';
   }
`;

const Price = styled.span<PriceProps>`
   font-size: 14px;
   font-weight: 600;
   line-height: 1;
   color: ${({ theme }) => theme.fg.black};

   ${({ discountedPrice, theme }) => {
      if (discountedPrice)
         return css`
            color: ${theme.fg.gray};
            text-decoration: line-through;

            ::after {
               display: inline-block;
               color: ${theme.fg.black};

               content: '${discountedPrice}';
               margin-left: 5px;
               text-decoration: none;
            }
         `;
   }}
`;

const Container = styled.div`
   position: relative;
   margin-bottom: 50px;

   :hover {
      ${ButtonContainer} {
         opacity: 1;
         transform: translateY(0);
         visibility: visible;
      }

      ${Title} {
         visibility: hidden;
         transition: 0.5s;
         opacity: 0;
         transform: translateY(-20px);
      }

      ${HoverText} {
         opacity: 1;
         transform: translateY(0);
         visibility: visible;
      }
   }
`;

export {
   Container,
   ProductImgWrapper,
   ButtonContainer,
   IconButton,
   Content,
   ContentTitle,
   Title,
   HoverText,
   Price,
};
