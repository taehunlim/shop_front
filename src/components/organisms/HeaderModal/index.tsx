import React from 'react';
import Modal, { ModalProps } from 'components/molecules/Modal';

import { Title } from './style';

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
         <div>
            <Title>{title}</Title>
            No Items found in {title.toLowerCase()}
         </div>
      </Modal>
   );
}

export default HeaderModal;
