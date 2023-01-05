import React, { useState, useRef, MouseEvent } from 'react';
import { Link } from 'react-router-dom';

import Icon from 'components/atoms/Icon';
import IconButton from 'components/molecules/IconButton';
import { useBrowserEvent } from 'hooks/useBrowserEvent';

import Navigation from '../Navigation';
import HeaderModal from '../HeaderModal';

import { StyledHeader, Container, LogoWrapper, IconContainer } from './style';

function Header() {
   const ref = useRef<HTMLHeadElement>(null);
   const [isSticky, setIsSticky] = useState(false);

   const [isShow, setIsShow] = useState<boolean>();
   const [modalTitle, setModalTitle] = useState('');

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
                     <button type="button" value="Search" onClick={handleModal}>
                        <Icon icon="search" width={15} />
                     </button>
                  </li>
                  <li>
                     <IconButton
                        icon="user"
                        width={15}
                        height={15}
                        type="button"
                        value="User"
                        onClick={handleModal}
                     />
                  </li>
                  <li>
                     <IconButton
                        icon="heart"
                        width={15}
                        height={15}
                        type="button"
                        value="Wishlist"
                        onClick={handleModal}
                     />
                  </li>
                  <li>
                     <IconButton
                        icon="cart"
                        width={15}
                        height={15}
                        type="button"
                        value="Cart"
                        onClick={handleModal}
                     />
                  </li>
               </ul>
            </IconContainer>
         </Container>

         <HeaderModal
            data-testid="header-modal"
            title={modalTitle}
            show={isShow}
            onClose={setIsShow}
         />
      </StyledHeader>
   );
}

export default Header;
