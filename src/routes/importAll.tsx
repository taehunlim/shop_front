import React from 'react';

type RequireContext = __WebpackModuleApi.RequireContext;

export const importAll = (r: RequireContext) =>
   r
      .keys()
      .filter((fileName: string) => fileName.includes('tsx'))
      .map((fileName: string) => {
         const Element = r(fileName).default;

         return {
            path: fileName
               .replace('./', '/')
               .replace(/\/src\/pages|index|\.tsx$/g, '')
               .replace(/\[(.+)\]/, ':$1'),
            element: <Element />,
         };
      });
