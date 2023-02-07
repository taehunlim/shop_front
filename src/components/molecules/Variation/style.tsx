import styled from '@emotion/styled';

interface Size {
   checked: boolean;
}

const Section = styled.div`
   display: grid;
   grid-template-columns: 120px auto;
   align-items: center;

   margin-bottom: 20px;

   span {
      font-size: 16px;
      font-weight: 500;

      color: ${({ theme }) => theme.fg.black};
   }
`;

const ColorContainer = styled.div`
   display: flex;
   gap: 35px;
`;

const SizeContainer = styled.div`
   display: flex;
   gap: 35px;
`;

const Size = styled.label<Size>`
   width: 24px;
   text-align: center;
   color: ${({ theme, checked }) => (checked ? theme.fg.black : theme.fg.gray)};
   font-size: 24px;

   margin-bottom: 0;
   cursor: pointer;
   text-transform: uppercase;
   :hover {
      color: ${({ theme }) => theme.fg.black};
   }
`;

export { Section, ColorContainer, SizeContainer, Size };
