import React, { useEffect, useState } from 'react';

interface Props {
   path: string;
   onNotFound: () => void;
   loading?: JSX.Element;
}

export default function AsyncComponent({
   path,
   onNotFound,
   loading,
   ...props
}: Props) {
   const [Component, setComponent] = useState<React.FunctionComponent | null>(
      null,
   );

   useEffect(() => {
      let cleanedUp = false;
      import(`../pages${path}`)
         .then((module) => {
            if (cleanedUp) {
               return;
            }

            setComponent(() => module.default);
         })
         .catch((e) => {
            if (cleanedUp) {
               return;
            }
            setComponent(null);
            if (e.message.startsWith('Cannot find module')) {
               onNotFound();
            }
         });
      return () => {
         setComponent(null);
         cleanedUp = true;
      };
   }, [path]);

   return Component ? (
      <Component {...props} />
   ) : (
      loading || <div>...loading</div>
   );
}
