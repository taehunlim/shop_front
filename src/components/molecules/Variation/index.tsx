import React, { useEffect, useState } from 'react';

import ColorRadio from 'components/atoms/ColorRadio';

import { ProductDataProps } from '../Product';

import { Section, ColorContainer, SizeContainer, Size } from './style';

type Variation = Pick<ProductDataProps, 'variation'>;
type Props = Variation & {
   onChange: ({ color, size }: { color: string; size: string }) => void;
};

function Variation({ variation, onChange }: Props) {
   const defaultVariation = variation[0];
   const { size, color } = defaultVariation;

   const [currentColorSize, setCurrentColorSize] = useState(size);
   const [currentValue, setCurrentValue] = useState({
      color,
      size: size[0].name,
   });

   useEffect(() => {
      onChange(currentValue);
   }, [currentValue.color, currentValue.size]);

   const handleColor = (variation: typeof defaultVariation) => {
      // local variable
      const { size, color } = variation;
      const defaultSize = size[0].name;

      setCurrentValue({
         size: defaultSize,
         color,
      });
      setCurrentColorSize(size);
   };

   const handleSize = (size: string) => {
      setCurrentValue({
         ...currentValue,
         size,
      });
   };

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
                     onChange={() => handleColor(color)}
                  />
               ))}
            </ColorContainer>
         </Section>
         <Section>
            <span>Size</span>
            <SizeContainer data-testid="size-container">
               {currentColorSize.map((size) => (
                  <Size
                     key={size.name}
                     checked={currentValue.size === size.name}
                     onClick={() => handleSize(size.name)}
                  >
                     {size.name}
                  </Size>
               ))}
            </SizeContainer>
         </Section>
      </div>
   );
}

export default Variation;
