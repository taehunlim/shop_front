import styled from '@emotion/styled';

const StyledRadio = styled.div`
   width: 24px;
   height: 24px;
   display: flex;
   border: ${({ theme }) => `1px solid ${theme.fg.gray}`};
   border-radius: 50px;

   overflow: hidden;
   position: relative;

   label {
      position: absolute;
      background: ${({ color }) => color};
      border-radius: 50px;
      width: 16px;
      height: 16px;

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
      width: 22px !important;
      height: 22px !important;
      text-align: center;

      &:checked {
         background-color: ${({ color }) => color};
      }
   }
`;

const styledComponent = { StyledRadio };

export default styledComponent;
