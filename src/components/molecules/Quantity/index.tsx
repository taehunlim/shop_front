import React, { ChangeEvent, useEffect, useState } from 'react';

import Button from 'components/atoms/Button';

import { Container } from './style';

interface Props {
   stock: number;
}

function Quantity({ stock }: Props) {
   const [quantity, setQuantity] = useState(1);

   useEffect(() => {
      setQuantity(1);
   }, [stock]);

   const isOutOfStock = stock === 0;

   const handleDecrease = () => {
      if (quantity < 1) return;
      setQuantity(quantity - 1);
   };

   const handleIncrease = () => {
      if (stock === quantity) return;
      setQuantity(quantity + 1);
   };

   const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.validity.valid) {
         const number = Number(e.target.value);
         if (number >= stock) return setQuantity(stock);
         setQuantity(number);
      }
   };

   return (
      <Container>
         <Button
            data-testid="decrease-button"
            disabled={isOutOfStock}
            onClick={handleDecrease}
         >
            -
         </Button>
         <input
            type="text"
            value={quantity}
            pattern="[0-9]*"
            onChange={handleInput}
            readOnly={isOutOfStock}
         />
         <Button
            data-testid="increase-button"
            disabled={isOutOfStock}
            onClick={handleIncrease}
         >
            +
         </Button>
      </Container>
   );
}

export default Quantity;
