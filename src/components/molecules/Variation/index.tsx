import React from 'react';

import ColorRadio from 'components/atoms/ColorRadio';

import { Section, ColorContainer, SizeContainer } from './style';

function Variation() {
   return (
      <div>
         <Section>
            <span>Color</span>
            <ColorContainer>
               <ColorRadio
                  color="#000000"
                  name="radio"
                  id="1"
                  onChange={console.log}
                  value="1"
               />
               <ColorRadio
                  color="red"
                  name="radio"
                  id="2"
                  onChange={console.log}
                  value="2"
               />
               <ColorRadio
                  color="blue"
                  name="radio"
                  id="3"
                  onChange={console.log}
                  value="3"
               />
            </ColorContainer>
         </Section>
         <Section>
            <span>Size</span>
            <SizeContainer>
               <label>S</label>
               <label>M</label>
               <label>L</label>
            </SizeContainer>
         </Section>
      </div>
   );
}

export default Variation;