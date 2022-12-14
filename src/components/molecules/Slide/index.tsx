import React, {
   ReactNode,
   TouchEvent,
   useEffect,
   useRef,
   useState,
} from 'react';

import Icon from 'components/atoms/Icon';

import {
   Container,
   SlideContainer,
   Wrapper,
   SlideItem,
   ButtonContainer,
} from './style';

interface Props {
   children: ReactNode;

   slideWidth?: string | number;
   slidePerView?: number;
   slideGap?: number;
   onChange?: (e: OnChangeType) => void;
   defaultIndex?: number;
}

type OnChangeType = {
   element: Element;
   slideIndex: number;
};

function Slide({
   children,
   slideWidth = '100%',
   slidePerView = 1,
   slideGap = 0,
   onChange,
   defaultIndex = 0,
}: Props) {
   const containerRef = useRef<HTMLDivElement>(null);
   const wrapperRef = useRef<HTMLDivElement>(null);
   const touchStart = useRef(0);
   const slideTransition = useRef('all 0.4s ease-in-out');

   const [currentSlideIndex, setCurrentSlideIndex] = useState(defaultIndex);
   const [slidePosition, setSlidePosition] = useState(`translateX(0)`);

   const width = slideWidth === 'auto' ? '100%' : slideWidth;
   const isPercent = !!(typeof width === 'string' && width.split('%')[0]);
   const tWidth = isPercent ? 100 : width;
   const perWidth = Number(tWidth) / slidePerView;

   const itemWidth = isPercent
      ? `calc(${perWidth}% - ${slideGap}px)`
      : `${perWidth - slideGap}`;

   useEffect(() => {
      if (defaultIndex) {
         handleSlidePosition(defaultIndex);
      }
   }, []);

   useEffect(() => {
      const wrapper = wrapperRef.current;

      if (wrapper) {
         if (onChange) {
            onChange({
               element: wrapper.children[currentSlideIndex],
               slideIndex: currentSlideIndex,
            });
         }
      }
   }, [currentSlideIndex]);

   function handleSlidePosition(index: number) {
      setCurrentSlideIndex(index);
      return setSlidePosition(`translateX(-${(index * 100) / slidePerView}%)`);
   }

   function currentSlide() {
      slideTransition.current = 'all 0.4s ease-in-out';
      handleSlidePosition(currentSlideIndex);
   }

   function nextSlide() {
      const lastSlideIndex = React.Children.count(children) - 1;
      slideTransition.current = 'all 0.4s ease-in-out';

      if (currentSlideIndex === lastSlideIndex) {
         return handleSlidePosition(0);
      }

      handleSlidePosition(currentSlideIndex + 1);
   }

   function prevSlide() {
      slideTransition.current = 'all 0.4s ease-in-out';

      if (currentSlideIndex === 0) {
         const lastSlideIndex = React.Children.count(children) - 1;

         return handleSlidePosition(lastSlideIndex);
      }

      handleSlidePosition(currentSlideIndex - 1);
   }

   function handleTouchStart(e: TouchEvent<HTMLDivElement>) {
      touchStart.current = e.touches[0].pageX;
   }

   function handleTouchMove(e: TouchEvent<HTMLDivElement>) {
      if (wrapperRef.current) {
         const current = wrapperRef.current.clientWidth * currentSlideIndex;

         const result =
            e.targetTouches[0].pageX -
            touchStart.current -
            current / slidePerView;
         setSlidePosition(`translateX(${result}px)`);

         slideTransition.current = '0ms';
      }
   }

   function handleTouchEnd(e: TouchEvent<HTMLDivElement>) {
      const end = e.changedTouches[0].pageX;

      const { current } = wrapperRef;
      if (current) {
         const slideReferencePoint = current.clientWidth / 3 / slidePerView;
         if (touchStart.current - end > slideReferencePoint) {
            return nextSlide();
         }

         if (end - touchStart.current > slideReferencePoint) {
            return prevSlide();
         }

         return currentSlide();
      }
   }

   const style = {
      transform: slidePosition,
      transition: slideTransition.current,
   };

   const itemStyle = {
      width: itemWidth,
      marginRight: `${slideGap}`,
   };

   return (
      <Container ref={containerRef} width={slideWidth}>
         <SlideContainer
            style={{ width }}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
         >
            <Wrapper ref={wrapperRef} style={style}>
               {React.Children.toArray(children).map((child, index) => (
                  <SlideItem key={index} style={itemStyle}>
                     {child}
                  </SlideItem>
               ))}
            </Wrapper>
         </SlideContainer>
         <ButtonContainer>
            <button type="button" onClick={prevSlide}>
               <Icon icon="arrow-left" />
            </button>
            <button type="button" onClick={nextSlide}>
               <Icon icon="arrow-right" />
            </button>
         </ButtonContainer>
      </Container>
   );
}

export default Slide;
