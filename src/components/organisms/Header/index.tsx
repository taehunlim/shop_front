import React, { useRef, useMemo, useState, MouseEvent } from 'react';
import { Link } from 'react-router-dom';

import useTypedSelector from 'hooks/useTypedSelector';
import { useBrowserEvent } from 'hooks/useBrowserEvent';

import Badge from 'components/atoms/Badge';
import IconButton from 'components/molecules/IconButton';
import Navigation from 'components/organisms/Navigation';
import HeaderModal from 'components/organisms/HeaderModal';

import { StyledHeader, Container, LogoWrapper, IconContainer } from './style';

function Header() {
   const ref = useRef<HTMLHeadElement>(null);
   const [isSticky, setIsSticky] = useState(false);

   const [isShow, setIsShow] = useState<boolean>();
   const [modalTitle, setModalTitle] = useState('Cart');

   const { cart, wishlist } = useTypedSelector((state) => {
      const { cartReducer, wishlistReducer } = state;
      return {
         cart: cartReducer.cart,
         wishlist: wishlistReducer.wishlist,
      };
   });

   useBrowserEvent('scroll', handleScroll);

   function handleScroll() {
      const headerHeight = (ref.current as HTMLHeadElement).offsetHeight;

      if (window.scrollY > headerHeight) {
         return setIsSticky(true);
      }
      return setIsSticky(false);
   }

   function handleModal(event: MouseEvent<HTMLButtonElement>) {
      const { value } = event.target as HTMLButtonElement;

      setIsShow(true);
      setModalTitle(value);
   }

   const getData = useMemo(() => {
      const key = modalTitle.toLocaleLowerCase();

      switch (key) {
         case 'cart':
            return cart;
         case 'wishlist':
            return wishlist;

         default:
            return [];
      }
   }, [cart, wishlist, modalTitle]);

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
                     <IconButton
                        icon="search"
                        width={20}
                        height={20}
                        type="button"
                        value="Search"
                        onClick={handleModal}
                     />
                  </li>
                  <li>
                     <IconButton
                        icon="user"
                        width={20}
                        height={20}
                        type="button"
                        value="User"
                        onClick={handleModal}
                     />
                  </li>
                  <li>
                     <Badge count={wishlist.length}>
                        <IconButton
                           icon="heart"
                           width={20}
                           height={20}
                           type="button"
                           value="Wishlist"
                           onClick={handleModal}
                        />
                     </Badge>
                  </li>
                  <li>
                     <Badge count={cart.length}>
                        <IconButton
                           icon="cart"
                           width={20}
                           height={20}
                           type="button"
                           value="Cart"
                           onClick={handleModal}
                        />
                     </Badge>
                  </li>
               </ul>
            </IconContainer>
         </Container>

         <HeaderModal
            data-testid="header-modal"
            data={getData}
            show={isShow}
            onClose={setIsShow}
            title={modalTitle}
         />
      </StyledHeader>
   );
}

export default Header;
