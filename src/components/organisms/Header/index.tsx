import React, {
   useRef,
   useState,
   MouseEvent,
   useCallback,
   useMemo,
} from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { deleteFromWishlist } from 'redux/actions/wishlistActions';
import { deleteFromCart } from 'redux/actions/cartActions';
import useTypedSelector from 'hooks/useTypedSelector';
import { useBrowserEvent } from 'hooks/useBrowserEvent';

import Badge from 'components/atoms/Badge';
import IconButton from 'components/molecules/IconButton';
import Navigation from 'components/organisms/Navigation';
import HeaderModal from 'components/organisms/HeaderModal';

import { ProductDataProps } from 'components/molecules/Product';
import { StyledHeader, Container, LogoWrapper, IconContainer } from './style';

function Header() {
   const dispatch = useDispatch();
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

   const deleteProductFromWishlist = useCallback(
      (product: ProductDataProps) => dispatch(deleteFromWishlist(product)),
      [dispatch],
   );
   const deleteProductFromCart = useCallback(
      (product: ProductDataProps) => dispatch(deleteFromCart(product)),
      [dispatch],
   );

   const handleScroll = useCallback(() => {
      const headerHeight = (ref.current as HTMLHeadElement).offsetHeight;

      if (window.scrollY > headerHeight) {
         return setIsSticky(true);
      }

      return setIsSticky(false);
   }, []);

   const getData = useMemo(() => {
      switch (modalTitle) {
         case 'Wishlist':
            return wishlist;
         case 'Cart':
            return cart;
         default:
            return [];
      }
   }, [wishlist, cart, modalTitle]);

   useBrowserEvent('scroll', handleScroll);

   function handleModal(event: MouseEvent<HTMLButtonElement>) {
      const { value } = event.target as HTMLButtonElement;

      setIsShow(true);
      setModalTitle(value);
   }

   function handleDelete(product: ProductDataProps) {
      switch (modalTitle) {
         case 'Wishlist':
            return deleteProductFromWishlist(product);
         case 'Cart':
            return deleteProductFromCart(product);
         default:
            return console.log('There is not product');
      }
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
            title={modalTitle}
            data={getData}
            show={isShow}
            onClose={setIsShow}
            onDelete={handleDelete}
         />
      </StyledHeader>
   );
}

export default Header;
