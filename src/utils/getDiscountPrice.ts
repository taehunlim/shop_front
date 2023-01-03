type PriceType = `${number}` | null;

export const getDiscountPrice = (
   price: number,
   discount: number,
): PriceType => {
   const discountedPrice = (price - price * (discount / 100)).toFixed(
      2,
   ) as PriceType;

   return discount && discount > 0 ? discountedPrice : null;
};
