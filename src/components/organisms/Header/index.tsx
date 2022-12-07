import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

import Icon from 'components/atoms/Icon';
import Navigation from '../Navigation';
import HeaderModal from '../HeaderModal';

import { StyledHeader, Container, LogoWrapper, IconContainer } from './style';

function Header() {
   const ref = useRef<HTMLHeadElement>(null);
   const [isSticky, setIsSticky] = useState(false);

   const [isWishShow, setIsWishShow] = useState<boolean>();
   const [isCartShow, setIsCartShow] = useState<boolean>();

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
                     <button type="button">
                        <Icon icon="search" width={15} />
                     </button>
                  </li>
                  <li>
                     <button type="button">
                        <Icon icon="user" width={15} />
                     </button>
                  </li>
                  <li>
                     <button type="button" onClick={() => setIsWishShow(true)}>
                        <Icon icon="heart" width={15} />
                     </button>
                  </li>
                  <li>
                     <button type="button" onClick={() => setIsCartShow(true)}>
                        <Icon icon="cart" width={15} />
                     </button>
                  </li>
               </ul>
            </IconContainer>
         </Container>

         <HeaderModal
            title="WishList"
            show={isWishShow}
            onClose={() => setIsWishShow(false)}
         />

         <HeaderModal
            title="Cart"
            show={isCartShow}
            onClose={() => setIsCartShow(false)}
         />
      </StyledHeader>
   );
}

export default Header;
