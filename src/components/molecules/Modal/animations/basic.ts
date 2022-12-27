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

/* Show modal content from bottom to top */
export const scaleUp = keyframes`
  0% {

    transform: scale(.8) translateY(300px);
    opacity: 0;
  }
  100% {

    transform: scale(1) translateY(0);
    opacity: 1;
  }
`;

export const scaleDown = keyframes`
  0% {
    transform: scale(1) translateY(0);
    opacity: 1;
  }
  100% {
    transform: scale(.8) translateY(300px);
    opacity: 0;
  }
`;

export const basicStyle = (
   Wrapper: ComponentSelector,
   Content: ComponentSelector,
) => css`
   &.show {
      visibility: visible;
      transform: scale(1);

      ${Wrapper} {
         background: transparent;
         animation: ${fadeIn} 0.5s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;
      }

      ${Content} {
         opacity: 0;
         animation: ${scaleUp} 0.5s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;
      }
   }

   &.hidden {
      visibility: hidden;
      transition: all 0.8s;

      transform: scale(1);

      animation: ${quickScaleDown} 0s 0.5s linear forwards;

      ${Wrapper} {
         animation: ${fadeOut} 0.5s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;
      }

      ${Content} {
         animation: ${scaleDown} 0.5s cubic-bezier(0.165, 0.84, 0.44, 1)
            forwards;
      }
   }
`;
