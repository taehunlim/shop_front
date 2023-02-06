import React, { useState } from 'react';

import ColorRadio from 'components/atoms/ColorRadio';

import { ProductDataProps } from '../Product';

import { Section, ColorContainer, SizeContainer } from './style';

type Props = Pick<ProductDataProps, 'variation'>;

function Variation({ variation }: Props) {
   const { size } = variation[0];
   const [currentColorSize, setCurrentColorSize] = useState(size);
   console.log(setCurrentColorSize);
   return (
      <div>
         <Section>
            <span>Color</span>
            <ColorContainer>
               {variation.map((color) => (
                  <ColorRadio
                     key={color.colorCode}
                     color={color.colorCode}
                     name="radio"
                     value={color.color}
                     defaultChecked={variation[0].color === color.color}
                  />
               ))}
            </ColorContainer>
         </Section>
         <Section>
            <span>Size</span>
            <SizeContainer>
               {currentColorSize.map((size) => (
                  <label key={size.name}>{size.name}</label>
               ))}
            </SizeContainer>
         </Section>
      </div>
   );
}

export default Variation;
