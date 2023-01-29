import React from 'react';
import { useParams } from 'react-router-dom';

function Product() {
   const params = useParams();

   console.log(params.id);

   return <div>product detail</div>;
}

export default Product;
