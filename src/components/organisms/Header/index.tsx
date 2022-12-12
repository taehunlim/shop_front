import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';

import Icon from 'components/atoms/Icon';
import { useBrowserEvent } from 'hooks/useBrowserEvent';

import Navigation from '../Navigation';
import HeaderModal from '../HeaderModal';

import { StyledHeader, Container, LogoWrapper, IconContainer } from './style';

function Header() {
   const ref = useRef<HTMLHeadElement>(null);
   const [isSticky, setIsSticky] = useState(false);

   const [isSearchShow, setIsSearchShow] = useState<boolean>();

   const [isWishShow, setIsWishShow] = useState<boolean>();
   const [isCartShow, setIsCartShow] = useState<boolean>();

   useBrowserEvent('scroll', handleScroll);

   function handleScroll() {
      const headerHeight = (ref.current as HTMLHeadElement).offsetHeight;

      if (window.scrollY > headerHeight) {
         return setIsSticky(true);
      }
      return setIsSticky(false);
   }

   return (
      <StyledHeader data-testid="header" ref={ref} isSticky={isSticky}>
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
                     <button
                        type="button"
                        onClick={() => setIsSearchShow(true)}
                     >
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
            data-testid="search-modal"
            width="100%"
            title="Search"
            show={isSearchShow}
            onClose={() => setIsSearchShow(false)}
         />

         <HeaderModal
            data-testid="wish-modal"
            title="WishList"
            show={isWishShow}
            onClose={() => setIsWishShow(false)}
         />

         <HeaderModal
            data-testid="cart-modal"
            title="Cart"
            show={isCartShow}
            onClose={() => setIsCartShow(false)}
         />
      </StyledHeader>
   );
}

export default Header;
