import { ComponentSelector, css } from '@emotion/react';

import {
   fadeIn,
   fadeOut,
   quickScaleDown,
   contentFadeIn,
   contentFadeOut,
} from './revealing';

export const revealingStyle = (
   Wrapper: ComponentSelector,
   Content: ComponentSelector,
) => css`
   &.show {
      transform: scale(1);

      ${Wrapper} {
         background: transparent;
         animation: ${fadeIn} 0.5s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;
      }

      ${Content} {
         opacity: 0;
         animation: ${contentFadeIn} 0.5s cubic-bezier(0.165, 0.84, 0.44, 1)
            forwards;
      }
   }

   &.hidden {
      transform: scale(1);

      animation: ${quickScaleDown} 0s 0.5s linear forwards;

      ${Wrapper} {
         animation: ${fadeOut} 0.5s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;
      }

      ${Content} {
         animation: ${contentFadeOut} 0.5s cubic-bezier(0.165, 0.84, 0.44, 1)
            forwards;
      }
   }
`;