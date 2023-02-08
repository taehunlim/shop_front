import React, { useEffect, useState } from 'react';

import ColorRadio from 'components/atoms/ColorRadio';

import { VariationProps, SizeProps } from 'fixtures/products';

import { Section, ColorContainer, SizeContainer, Size } from './style';

interface Props {
   variation: VariationProps[];
   onChange: ({ color, size }: { color: string; size: SizeProps }) => void;
}

function Variation({ variation, onChange }: Props) {
   const defaultVariation = variation[0];
   const { size, color } = defaultVariation;

   const [currentSizesForColor, setCurrentSizesForColor] = useState(size);
   const [currentValue, setCurrentValue] = useState({
      color,
      size: size[0],
   });

   useEffect(() => {
      onChange(currentValue);
   }, [currentValue.color, currentValue.size]);

   const handleColor = (variation: VariationProps) => {
      // local variable
      const { size, color } = variation;
      const defaultSize = size[0];

      setCurrentValue({
         size: defaultSize,
         color,
      });
      setCurrentSizesForColor(size);
   };

   const handleSize = (size: SizeProps) => {
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
               {currentSizesForColor.map((size) => (
                  <Size
                     key={size.name}
                     checked={currentValue.size.name === size.name}
                     onClick={() => handleSize(size)}
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
