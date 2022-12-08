import { keyframes } from '@emotion/react';

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
