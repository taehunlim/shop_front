import React from 'react';

import styledComponent, { ContentProps, ContainerProps } from './style';

const { Container, Wrapper, Content, CloseButton } = styledComponent;

export interface ModalProps extends ContentProps, ContainerProps {
   show: boolean | undefined;
   onClose: (f: boolean) => void;
   children?: React.ReactNode;
}

function Modal({
   show,
   onClose,
   children,
   width,
   modalStyle,
   ...props
}: ModalProps) {
   const isHidden = typeof show === 'undefined' ? '' : 'hidden';

   const showClass = show ? 'show' : isHidden;

   return (
      <Container
         modalStyle={modalStyle}
         {...props}
         className={`revealing ${showClass}`}
      >
         <Wrapper>
            <Content width={width}>
               <CloseButton onClick={() => onClose(false)}>✕</CloseButton>
               {children}
            </Content>
         </Wrapper>
      </Container>
   );
}

export default Modal;
