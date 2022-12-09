import React from 'react';

import styledComponent, { ContentProps } from './style';

const { Container, Wrapper, Content, CloseButton } = styledComponent;

export interface ModalProps extends ContentProps {
   show: boolean | undefined;
   onClose: () => void;
   children?: React.ReactNode;
}

function Modal({ show, onClose, children, width, ...props }: ModalProps) {
   const isHidden = typeof show === 'undefined' ? '' : 'hidden';

   const showClass = show ? 'show' : isHidden;

   return (
      <Container {...props} className={`revealing ${showClass}`}>
         <Wrapper>
            <Content width={width}>
               <CloseButton onClick={onClose}>✕</CloseButton>
               {children}
            </Content>
         </Wrapper>
      </Container>
   );
}

export default Modal;
