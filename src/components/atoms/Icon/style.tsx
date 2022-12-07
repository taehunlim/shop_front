import styled from '@emotion/styled';

export interface IconStyleProps {
   width?: number;
   height?: number;
}

const fontSize = ({ width, height }: IconStyleProps) => {
   if (width && height) {
      return '0px';
   } 
      const size = width || height;
      return size ? `${size}px` : '22px';
   
};

const StyledIcon = styled.span<IconStyleProps>`
   display: inline-block;

   font-size: ${fontSize} !important;
   width: ${(props) =>
      props.width && props.height ? `${props.width}px` : '1em'};
   height: ${(props) =>
      props.width && props.height ? `${props.height}px` : '1em'};
   //margin: 0.1em;
   box-sizing: border-box;

   svg {
      pointer-events: none;
      width: 100%;
      height: 100%;
      fill: currentcolor;
   }
`;

const styledComponent = { StyledIcon };

export default styledComponent;
