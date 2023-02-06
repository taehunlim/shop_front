import { DependencyList, useCallback } from 'react';
import { AnyAction } from 'redux';
import { useDispatch } from 'react-redux';

import { ProductDataProps } from 'fixtures/products';

const useProductDispatch = (
   callback: (p: ProductDataProps) => AnyAction,
   deps?: DependencyList,
) => {
   const dispatch = useDispatch();

   return useCallback(
      (product: ProductDataProps) => dispatch(callback(product)),
      deps || [dispatch],
   );
};

export default useProductDispatch;
