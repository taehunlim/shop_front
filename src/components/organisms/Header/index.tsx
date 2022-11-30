import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

import Navigation from '../Navigation';

import { StyledHeader, Container, LogoWrapper, IconContainer } from './style';

function Header() {
   const ref = useRef<HTMLHeadElement>(null);
   const [isSticky, setIsSticky] = useState(false);

   useEffect(() => {
      if (ref.current) {
         window.addEventListener('scroll', handleScroll);

         return () => {
            window.removeEventListener('scroll', handleScroll);
         };
      }
   }, [ref]);

   const handleScroll = () => {
      const headerHeight = (ref.current as HTMLHeadElement).offsetHeight;

      if (window.scrollY > headerHeight) {
         return setIsSticky(true);
      }
      return setIsSticky(false);
   };

   return (
      <StyledHeader ref={ref} isSticky={isSticky}>
         <Container>
            <LogoWrapper>
               <Link to="/">
                  <img alt="logo" />
               </Link>
            </LogoWrapper>
            <Navigation />
            <IconContainer>
               <ul>
                  <li>
                     <button type="button">S</button>
                  </li>
                  <li>
                     <button type="button">P</button>
                  </li>
                  <li>
                     <button type="button">H</button>
                  </li>
                  <li>
                     <button type="button">C</button>
                  </li>
               </ul>
            </IconContainer>
         </Container>
      </StyledHeader>
   );
}

export default Header;
