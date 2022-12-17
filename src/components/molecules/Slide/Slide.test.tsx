import React from 'react';
import { fireEvent, render } from '@testing-library/react';

import Slide, { SlideProps, getItemWidth } from '.';

type Props = Omit<SlideProps, 'children'>;
interface Touch {
   pageX: number;
   pageY: number;
}

describe('Slide Component', () => {
   const onChange = jest.fn();

   function setWindowSize(width: string | number) {
      Object.defineProperties(window.HTMLElement.prototype, {
         offsetWidth: {
            get: function () {
               return width;
            },
         },
      });
   }

   function getTouchEnd(end: number) {
      return [{ pageX: end, pageY: 0 }];
   }

   const getComponent = ({
      width,
      slidePerView,
      slideGap,
      onChange,
      defaultIndex,
   }: Props) => {
      const result = render(
         <Slide
            width={width}
            slidePerView={slidePerView}
            slideGap={slideGap}
            onChange={onChange}
            defaultIndex={defaultIndex}
         >
            <div data-testid="slide-1">1</div>
            <div data-testid="slide-2">2</div>
            <div data-testid="slide-3">3</div>
         </Slide>,
      );

      const { container, getByTestId, getAllByRole } = result;

      const Buttons = getAllByRole('button');
      const PrevButton = Buttons[0];
      const NextButton = Buttons[1];

      const SlideContainer = container.firstElementChild
         ?.firstElementChild as HTMLDivElement;
      const SlideWrapper = SlideContainer.firstElementChild as HTMLDivElement;
      const Slide1 = getByTestId('slide-1');
      const Slide2 = getByTestId('slide-2');
      const Slide3 = getByTestId('slide-3');

      const clickPrev = () => fireEvent.click(PrevButton);
      const clickNext = () => fireEvent.click(NextButton);

      const touchStart = (start: Touch[]) =>
         fireEvent.touchStart(SlideContainer, {
            touches: start,
         });
      const touchMove = (start: Touch[], end: Touch[]) =>
         fireEvent.touchMove(SlideContainer, {
            targetTouches: start,
            touches: end,
         });
      const touchEnd = (end: Touch[]) =>
         fireEvent.touchEnd(SlideContainer, {
            changedTouches: end,
         });

      return {
         PrevButton,
         NextButton,

         clickPrev,
         clickNext,
         touchStart,
         touchMove,
         touchEnd,

         container,
         SlideWrapper,
         Slide1,
         Slide2,
         Slide3,
      };
   };

   it('render test', () => {
      const width = window.innerWidth;
      setWindowSize(width);

      const { PrevButton, NextButton, Slide1, Slide2, Slide3 } = getComponent(
         {},
      );

      expect(PrevButton).toBeInTheDocument();
      expect(NextButton).toBeInTheDocument();

      expect(Slide1).toBeInTheDocument();
      expect(Slide2).toBeInTheDocument();
      expect(Slide3).toBeInTheDocument();

      expect(Slide1).toHaveStyle(`width: ${width}`);
      expect(Slide1).toHaveStyle(`width: ${width}`);
      expect(Slide1).toHaveStyle(`width: ${width}`);
   });

   it('next slide test', () => {
      const { clickNext, SlideWrapper, Slide1, Slide2, Slide3 } = getComponent({
         onChange: onChange,
      });

      expect(SlideWrapper).toHaveStyle('transform: translateX(0%)');

      clickNext();
      expect(SlideWrapper).toHaveStyle('transform: translateX(-100%)');
      expect(onChange).toBeCalledWith({
         element: Slide2.parentElement,
         slideIndex: 1,
      });

      clickNext();
      expect(SlideWrapper).toHaveStyle('transform: translateX(-200%)');
      expect(onChange).toBeCalledWith({
         element: Slide3.parentElement,
         slideIndex: 2,
      });

      clickNext();
      expect(SlideWrapper).toHaveStyle('transform: translateX(0%)');
      expect(onChange).toBeCalledWith({
         element: Slide1.parentElement,
         slideIndex: 0,
      });
   });

   it('prev slide test', () => {
      const { clickPrev, SlideWrapper, Slide1, Slide2, Slide3 } = getComponent(
         {},
      );

      expect(SlideWrapper).toHaveStyle('transform: translateX(0%)');

      clickPrev();
      expect(SlideWrapper).toHaveStyle('transform: translateX(-200%)');
      expect(onChange).toBeCalledWith({
         element: Slide3.parentElement,
         slideIndex: 2,
      });
      clickPrev();
      expect(SlideWrapper).toHaveStyle('transform: translateX(-100%)');
      expect(onChange).toBeCalledWith({
         element: Slide2.parentElement,
         slideIndex: 1,
      });

      clickPrev();
      expect(SlideWrapper).toHaveStyle('transform: translateX(0%)');
      expect(onChange).toBeCalledWith({
         element: Slide1.parentElement,
         slideIndex: 0,
      });
   });

   it('touch slide test', () => {
      setWindowSize(window.innerWidth);

      const { SlideWrapper, touchStart, touchMove, touchEnd, Slide1, Slide2 } =
         getComponent({});

      const referencePoint = SlideWrapper.offsetWidth / 3;
      const start = [{ pageX: 0, pageY: 0 }];

      const nextSlideEnd = getTouchEnd(-(referencePoint + 1));
      const prevSlideEnd = getTouchEnd(referencePoint + 1);
      const currentSlideEnd = getTouchEnd(referencePoint);

      expect(SlideWrapper).toHaveStyle('transform: translateX(0%)');

      touchStart(start);
      touchMove(start, nextSlideEnd);
      touchEnd(nextSlideEnd);

      expect(SlideWrapper).toHaveStyle('transform: translateX(-100%)');
      expect(onChange).toBeCalledWith({
         element: Slide2.parentElement,
         slideIndex: 1,
      });

      touchMove(start, prevSlideEnd);
      touchEnd(prevSlideEnd);

      expect(SlideWrapper).toHaveStyle('transform: translateX(0%)');
      expect(onChange).toBeCalledWith({
         element: Slide1.parentElement,
         slideIndex: 0,
      });

      touchMove(start, currentSlideEnd);
      touchEnd(currentSlideEnd);

      expect(SlideWrapper).toHaveStyle('transform: translateX(0%)');
      expect(onChange).toBeCalledWith({
         element: Slide1.parentElement,
         slideIndex: 0,
      });
   });

   it('perView with number width test', () => {
      const width = 500;
      const gap = 50;
      const perView = 2;

      setWindowSize(width);
      const itemWidth = getItemWidth(width, perView, gap);

      const { Slide1, Slide2, Slide3 } = getComponent({
         width: width,
         slideGap: gap,
         slidePerView: perView,
      });

      expect(Slide1.parentElement).toHaveStyle(`width: ${itemWidth}`);
      expect(Slide2.parentElement).toHaveStyle(`width: ${itemWidth}`);
      expect(Slide3.parentElement).toHaveStyle(`width: ${itemWidth}`);
   });

   it('perView with percent width test', () => {
      const width = '80%';
      const gap = 50;
      const perView = 3;

      setWindowSize(width);
      const itemWidth = getItemWidth(width, perView, gap);

      const { Slide1, Slide2, Slide3 } = getComponent({
         width: width,
         slideGap: gap,
         slidePerView: perView,
      });

      expect(Slide1.parentElement).toHaveStyle(`width: ${itemWidth}`);
      expect(Slide2.parentElement).toHaveStyle(`width: ${itemWidth}`);
      expect(Slide3.parentElement).toHaveStyle(`width: ${itemWidth}`);
   });

   it('defaultIndex test', () => {
      const index = 2;
      const { SlideWrapper } = getComponent({
         defaultIndex: 2,
      });

      expect(SlideWrapper).toHaveStyle(
         `transform: translateX(-${index * 100}%)`,
      );
   });
});
