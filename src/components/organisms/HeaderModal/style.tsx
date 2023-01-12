import styled from '@emotion/styled';

const Container = styled.div`
   padding: 20px;
   height: 100%;
`;

const Title = styled.h3`
   font-size: 18px;
   font-weight: 500;
   line-height: 28px;
   margin: 0 0 20px;
   padding-bottom: 5px;
   color: #333;
   border-bottom: 1px solid #eeeeee;
`;

const ProductContainer = styled.div`
   position: relative;
   display: grid;
   grid-template-columns: 0.3fr 1fr;
   gap: 15px;

   padding-bottom: 25px;
   margin-bottom: 25px;

   border-bottom: 1px solid #eeeeee;
`;

const ProductContent = styled.div`
   p {
      font-size: 14px;

      span {
         color: ${({ theme }) => theme.fg.gray};
      }
   }
`;

const DeleteButton = styled.button`
   position: absolute;
   z-index: 9;
   right: 0;

   cursor: pointer;
   color: ${({ theme }) => theme.fg.black};
`;

export { Container, Title, ProductContainer, ProductContent, DeleteButton };
