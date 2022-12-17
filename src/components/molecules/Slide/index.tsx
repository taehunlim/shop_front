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
   ContainerWidth,
   Width,
   Translate,
} from './style';

interface OnChangeType {
   element: Element;
   slideIndex: number;
}

export interface SlideProps {
   children: ReactNode;

   width?: ContainerWidth;
   slidePerView?: number;
   slideGap?: number;
   onChange?: (e: OnChangeType) => void;
   defaultIndex?: number;
}

export function getItemWidth(
   width: ContainerWidth,
   perView: number,
   gap: number,
): Width {
   const isPercent = typeof width === 'string';
   const perWidth: number = (isPercent ? 100 : width) / perView;
   const percentWidth: Width = gap
      ? `calc(${perWidth}% - ${gap}px)`
      : `${perWidth}%`;
   return isPercent ? percentWidth : perWidth - gap;
}

function Slide({
   children,
   width = '100%',
   slidePerView = 1,
   slideGap = 0,
   onChange,
   defaultIndex = 0,
}: SlideProps) {
   const containerRef = useRef<HTMLDivElement>(null);
   const wrapperRef = useRef<HTMLDivElement>(null);
   const touchStart = useRef(0);
   const currentSlideIndex = useRef(defaultIndex);

   const [slidePosition, setSlidePosition] =
      useState<Translate>(`translateX(0%)`);

   const itemWidth: Width = getItemWidth(width, slidePerView, slideGap);

   useEffect(() => {
      if (defaultIndex) {
         handleSlidePosition(defaultIndex);
      }
   }, []);

   function handleSlidePosition(index: number) {
      currentSlideIndex.current = index;

      const wrapper = wrapperRef.current as HTMLDivElement;
      wrapper.style.transition = 'all 0.4s ease-in-out';

      if (onChange) {
         onChange({
            element: wrapper.children[currentSlideIndex.current],
            slideIndex: currentSlideIndex.current,
         });
      }

      return setSlidePosition(`translateX(${-(index * 100) / slidePerView}%)`);
   }

   function currentSlide() {
      handleSlidePosition(currentSlideIndex.current);
   }

   function nextSlide() {
      const lastSlideIndex = React.Children.count(children) - 1;

      if (currentSlideIndex.current === lastSlideIndex) {
         return handleSlidePosition(0);
      }

      handleSlidePosition(currentSlideIndex.current + 1);
   }

   function prevSlide() {
      if (currentSlideIndex.current === 0) {
         const lastSlideIndex = React.Children.count(children) - 1;

         return handleSlidePosition(lastSlideIndex);
      }

      handleSlidePosition(currentSlideIndex.current - 1);
   }

   function handleTouchStart(e: TouchEvent<HTMLDivElement>) {
      touchStart.current = e.touches[0].pageX;
   }

   function handleTouchMove(e: TouchEvent<HTMLDivElement>) {
      const wrapper = wrapperRef.current as HTMLDivElement;
      wrapper.style.transition = '0ms';

      const current = wrapper.offsetWidth * currentSlideIndex.current;

      const result =
         e.targetTouches[0].pageX - touchStart.current - current / slidePerView;
      setSlidePosition(`translateX(${result}px)`);
   }

   function handleTouchEnd(e: TouchEvent<HTMLDivElement>) {
      const end = e.changedTouches[0].pageX;

      const wrapper = wrapperRef.current as HTMLDivElement;

      const slideReferencePoint = wrapper.offsetWidth / 3 / slidePerView;

      if (touchStart.current - end > slideReferencePoint) {
         return nextSlide();
      }

      if (end - touchStart.current > slideReferencePoint) {
         return prevSlide();
      }

      return currentSlide();
   }

   return (
      <Container ref={containerRef}>
         <SlideContainer
            width={width}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
         >
            <Wrapper ref={wrapperRef} position={slidePosition}>
               {React.Children.toArray(children).map((child, index) => (
                  <SlideItem key={index} slideWidth={itemWidth} gap={slideGap}>
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
