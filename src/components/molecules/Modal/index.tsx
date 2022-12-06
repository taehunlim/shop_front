import React from 'react';

import styledComponent from './style';

const { Container, Wrapper, Content, CloseButton } = styledComponent;

export interface ModalProps {
   show: boolean | undefined;
   onClose: () => void;
   children?: React.ReactNode;
}

function Modal({ show, onClose, children }: ModalProps) {
   const isHidden = typeof show === 'undefined' ? '' : 'hidden';

   const showClass = show ? 'show' : isHidden;

   return (
      <Container className={`revealing ${showClass}`}>
         <Wrapper>
            <Content>
               <CloseButton onClick={onClose}>✕</CloseButton>
               {children}
            </Content>
         </Wrapper>
      </Container>
   );
}

export default Modal;
