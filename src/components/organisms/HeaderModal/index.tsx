import React from 'react';
import Modal, { ModalProps } from 'components/molecules/Modal';

import { Container, Title } from './style';

interface HeaderProps extends ModalProps {
   title: string;
}

function HeaderModal({ title, show, onClose, width, ...props }: HeaderProps) {
   return (
      <Modal
         {...props}
         modalStyle="sidebar"
         width={width}
         show={show}
         onClose={onClose}
      >
         <Container>
            <Title>{title}</Title>
            No Items found in {title.toLowerCase()}
         </Container>
      </Modal>
   );
}

export default HeaderModal;
