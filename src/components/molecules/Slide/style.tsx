import styled from '@emotion/styled';

export type ContainerWidth = `${number}%` | number;
export type Width = Calc | ContainerWidth;
export type Translate = `translateX(${number}${Unit})`;

type Gap = ` - ${number}px`;
type Calc = `calc(${number}%${Gap})`;
type Unit = `px` | `%`;

interface SlideContainerProps {
   width: ContainerWidth;
}

interface SlideItemsProps {
   slideWidth: Width;
   gap: number;
   centerGap: boolean;
}

interface WrapperProps {
   position: Translate;
}

const ButtonContainer = styled.div`
   opacity: 0;
   transition: 0.3s;

   width: 100%;

   position: absolute;
   z-index: 9;
   top: 50%;
   transform: translateY(-50%);

   button {
      color: #ffffff;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);

      :first-of-type {
         left: 20;
      }

      :last-of-type {
         right: 20;
      }
   }
`;

const SlideContainer = styled.div<SlideContainerProps>`
   overflow: hidden;
   width: ${({ width }) => width};
`;

const Wrapper = styled.div<WrapperProps>`
   display: flex;
   width: 100%;
   height: 100%;

   position: relative;

   transform: ${({ position }) => position};
`;

const SlideItem = styled.div<SlideItemsProps>`
   display: flex;
   flex-shrink: 0;

   width: ${({ slideWidth }) => slideWidth};
   margin-right: ${({ centerGap, gap }) => (centerGap ? gap / 2 : gap)};
   margin-left: ${({ centerGap, gap }) => (centerGap ? gap / 2 : 0)};

   height: 100%;

   img {
      object-fit: contain;
      height: auto;
   }
`;

const Container = styled.div`
   position: relative;
   height: 100%;

   display: flex;
   align-items: center;
   justify-content: center;

   :hover {
      ${ButtonContainer} {
         opacity: 1;
      }
   }
`;

export { Container, SlideContainer, Wrapper, SlideItem, ButtonContainer };
