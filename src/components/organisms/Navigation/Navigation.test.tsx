import React from 'react';
import { fireEvent } from '@testing-library/react';

import Navigation from '.';
import { renderWithRouter } from 'utils/tests/renderWithRouter';
import EmotionProvider from 'assets/EmotionProvider';

import navs from 'fixtures/navs';

describe('Navigation test', () => {
   const component = (path?: string) => {
      return renderWithRouter(
         <EmotionProvider>
            <Navigation />
         </EmotionProvider>,
         { route: path },
      );
   };

   it('render test', () => {
      const { getAllByRole } = component();
      const links = getAllByRole('link');

      expect(links).toHaveLength(navs.length);
   });

   it('nav link test', () => {
      const { getByTestId } = component();
      const main = getByTestId('nav');

      for (let i = 0; i < navs.length; i++) {
         const mainLink = main.children[i].firstChild as HTMLAnchorElement;

         fireEvent.click(mainLink);
         expect(window.location.pathname).toBe(navs[i].url);

         // subNav test
         if (mainLink.nextElementSibling) {
            const subNav = getByTestId(`nav_${i}-subNav`);
            const subNavList = subNav.children;

            const subNavs = navs[i].children;
            if (subNav) {
               for (let j = 0; j < subNavList.length; j++) {
                  const subLink = subNavList[j]
                     .firstElementChild as HTMLAnchorElement;
                  fireEvent.click(subLink);

                  expect(window.location.pathname).toBe(subNavs![j].url);

                  //thirdNav test
                  const thirdNav = getByTestId(`nav_${i}-subNav_${j}-thirdNav`);
                  const thirdNavList = thirdNav.children;
                  const thirdNavs = subNavs![j].children;
                  if (thirdNavs) {
                     for (let k = 0; k < thirdNavList.length; k++) {
                        const thirdLink = thirdNavList[k]
                           .firstElementChild as HTMLAnchorElement;
                        fireEvent.click(thirdLink);

                        expect(window.location.pathname).toBe(
                           thirdNavs![k].url,
                        );
                     }
                  }
               }
            }
         }
      }
   });
});
