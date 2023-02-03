import React, { lazy } from 'react';

type RequireContext = __WebpackModuleApi.RequireContext;

const importAll = (r: RequireContext) =>
   r
      .keys()
      .filter((fileName: string) => fileName.includes('tsx'))
      .map((fileName: string) => {
         const path = fileName
            .replace('./', '/')
            .replace(/\/src\/pages|index|\.tsx$/g, '')
            .replace(/\[(.+)\]/, ':$1');

         const Element = lazy(
            () =>
               import(
                  /* webpackPrefetch: true */
                  /* webpackChunkName: "[request]" */
                  `../pages${fileName.replace('./', '/')}`
               ),
         );

         return {
            path,
            element: <Element />,
         };
      });

export default importAll;
