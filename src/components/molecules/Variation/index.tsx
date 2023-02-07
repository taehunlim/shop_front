import React, { useState } from 'react';

import ColorRadio from 'components/atoms/ColorRadio';

import { ProductDataProps } from '../Product';

import { Section, ColorContainer, SizeContainer, Size } from './style';

type Props = Pick<ProductDataProps, 'variation'>;

function Variation({ variation }: Props) {
   const { size } = variation[0];
   const [currentColorSize, setCurrentColorSize] = useState(size);
   const [currentSize, setCurrentSize] = useState(size[0].name);

   console.log(setCurrentSize);
   return (
      <div>
         <Section>
            <span>Color</span>
            <ColorContainer data-testid="color-container">
               {variation.map((color) => (
                  <ColorRadio
                     key={color.colorCode}
                     color={color.colorCode}
                     name="radio"
                     value={color.color}
                     defaultChecked={variation[0].color === color.color}
                     onChange={() => setCurrentColorSize(color.size)}
                  />
               ))}
            </ColorContainer>
         </Section>
         <Section>
            <span>Size</span>
            <SizeContainer data-testid="size-container">
               {currentColorSize.map((size) => (
                  <Size key={size.name} checked={currentSize === size.name}>
                     {size.name}
                  </Size>
               ))}
            </SizeContainer>
         </Section>
      </div>
   );
}

export default Variation;
