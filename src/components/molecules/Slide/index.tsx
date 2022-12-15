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

interface Props {
   children: ReactNode;

   width?: ContainerWidth;
   slidePerView?: number;
   slideGap?: number;
   onChange?: (e: OnChangeType) => void;
   defaultIndex?: number;
}

function Slide({
   children,
   width = '100%',
   slidePerView = 1,
   slideGap = 0,
   onChange,
   defaultIndex = 0,
}: Props) {
   const containerRef = useRef<HTMLDivElement>(null);
   const wrapperRef = useRef<HTMLDivElement>(null);
   const touchStart = useRef(0);

   const [currentSlideIndex, setCurrentSlideIndex] = useState(defaultIndex);
   const [slidePosition, setSlidePosition] =
      useState<Translate>(`translateX(0px)`);

   const isPercent = typeof width === 'string';
   const perWidth: number = (isPercent ? 100 : width) / slidePerView;
   const percentWidth: Width = slideGap
      ? `calc(${perWidth}% - ${slideGap}px)`
      : `${perWidth}%`;

   const itemWidth: Width = isPercent ? percentWidth : perWidth - slideGap;

   useEffect(() => {
      if (defaultIndex) {
         handleSlidePosition(defaultIndex);
      }
   }, []);

   useEffect(() => {
      if (onChange) {
         const wrapper = wrapperRef.current;
         if (wrapper) {
            onChange({
               element: wrapper.children[currentSlideIndex],
               slideIndex: currentSlideIndex,
            });
         }
      }
   }, [currentSlideIndex]);

   function handleSlidePosition(index: number) {
      if (wrapperRef.current) {
         wrapperRef.current.style.transition = 'all 0.4s ease-in-out';
      }

      setCurrentSlideIndex(index);
      return setSlidePosition(`translateX(${-(index * 100) / slidePerView}%)`);
   }

   function currentSlide() {
      handleSlidePosition(currentSlideIndex);
   }

   function nextSlide() {
      const lastSlideIndex = React.Children.count(children) - 1;

      if (currentSlideIndex === lastSlideIndex) {
         return handleSlidePosition(0);
      }

      handleSlidePosition(currentSlideIndex + 1);
   }

   function prevSlide() {
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
         wrapperRef.current.style.transition = '0ms';

         const current = wrapperRef.current.clientWidth * currentSlideIndex;

         const result =
            e.targetTouches[0].pageX -
            touchStart.current -
            current / slidePerView;
         setSlidePosition(`translateX(${result}px)`);
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
