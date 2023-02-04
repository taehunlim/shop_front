import styled from '@emotion/styled';

const StyledRadio = styled.div`
   width: 16px;
   height: 16px;
   display: flex;
   border: ${({ theme }) => `1px solid ${theme.fg.gray}`};
   border-radius: 50px;
   margin: 3px;
   overflow: hidden;
   position: relative;

   label {
      position: absolute;
      background: white;
      border-radius: 50px;
      width: 6px;
      height: 6px;

      top: 0;
      left: 0;
      right: 0;
      bottom: 0;

      margin: auto;
   }

   input {
      margin: 0 !important;
      padding: 0;
      appearance: none;
      width: 14px !important;
      height: 14px !important;
      text-align: center;

      &:checked {
         background-color: ${({ theme }) => theme.fg.onGoing};
      }
   }
`;

const styledComponent = { StyledRadio };

export default styledComponent;
