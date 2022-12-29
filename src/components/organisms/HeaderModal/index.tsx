import React from 'react';
import Modal, { ModalProps } from 'components/molecules/Modal';

import { Container, Title } from './style';

interface Props extends ModalProps {
   title: string;
}

function HeaderModal({ title, show, onClose, width, ...props }: Props) {
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
