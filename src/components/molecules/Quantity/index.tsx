import React, { ChangeEvent, useState } from 'react';

import Button from 'components/atoms/Button';

import { Container } from './style';

function Quantity() {
   const [quantity, setQuantity] = useState(1);

   const handleDecrease = () => {
      if (quantity < 1) return;
      setQuantity(quantity - 1);
   };

   const handleIncrease = () => {
      setQuantity(quantity + 1);
   };

   const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.validity.valid) {
         setQuantity(Number(e.target.value));
      }
   };

   return (
      <Container>
         <Button data-testid="decrease-button" onClick={handleDecrease}>
            -
         </Button>
         <input
            type="text"
            value={quantity}
            pattern="[0-9]*"
            onChange={handleInput}
         />
         <Button data-testid="increase-button" onClick={handleIncrease}>
            +
         </Button>
      </Container>
   );
}

export default Quantity;
