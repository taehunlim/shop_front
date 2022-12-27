import { ComponentSelector, css, keyframes } from '@emotion/react';

/* Hide modal container */
export const quickScaleDown = keyframes`
  0% {
    transform: scale(1);
  }
  99.9% {
    transform: scale(1);
  }
  100% {
    transform: scale(0);
  }
`;

export const fadeIn = keyframes`
  0% { 
    background: transparent; 
  } 
  100% { 
    background: rgba(0, 0, 0, .7); 
  }
`;

export const fadeOut = keyframes`
  0% {
    background: rgba(0, 0, 0, .7); 
  }
  100% { 
    background: transparent; 
  }
`;

export const contentFadeIn = keyframes`
  0% {
    transform: translateX(100%);
    opacity: 0;
  }
  100% {
    transform: translateX(0);
    opacity: 1;
  }
`;

export const contentFadeOut = keyframes`
  0% {
    transform: translateX(0);
    opacity: 1;
  }
  100% {
    transform: translateX(100%);
    opacity: 0;
  }
`;

export const sidebarStyle = (
   Wrapper: ComponentSelector,
   Content: ComponentSelector,
) => css`
   &.show {
      visibility: visible;
      transform: scale(1);

      ${Wrapper} {
         background: transparent;
         animation: ${fadeIn} 0.8s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;
      }

      ${Content} {
         opacity: 0;
         animation: ${contentFadeIn} 0.8s cubic-bezier(0.165, 0.84, 0.44, 1)
            forwards;
      }
   }

   &.hidden {
      visibility: hidden;
      transition: all 0.8s;

      transform: scale(1);

      animation: ${quickScaleDown} 0s 0.8s linear forwards;

      ${Wrapper} {
         animation: ${fadeOut} 0.8s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;
      }

      ${Content} {
         animation: ${contentFadeOut} 0.8s cubic-bezier(0.165, 0.84, 0.44, 1)
            forwards;
      }
   }
`;
