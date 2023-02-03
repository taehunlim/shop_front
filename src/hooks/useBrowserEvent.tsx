import { useRef, useEffect } from 'react';

type WindowMapKey = keyof WindowEventMap;
type Event = WindowEventMap[WindowMapKey];
type Listener = (ev: Event) => any;

export function useBrowserEvent(
   eventType: WindowMapKey,
   listener: Listener,
   options?: boolean | AddEventListenerOptions,
) {
   const callbackRef = useRef<Listener>(listener);
   callbackRef.current = listener;

   useEffect(() => {
      const onEvent = (e: Event) => {
         callbackRef.current(e);
      };

      window.addEventListener(eventType, onEvent, options);
      return () => {
         window.removeEventListener(eventType, onEvent, options);
      };
   }, [eventType]);
}
