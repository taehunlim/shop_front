import styled from '@emotion/styled';

const Container = styled.div`
   display: flex;
`;

const Content = styled.div`
   padding: 30px;
   width: 550px;

   h2 {
      font-size: 34px;
      font-weight: 400;
      line-height: 1.3;

      margin: 0 0 20px;
   }

   p {
      font-size: 15px;
      line-height: 1.5;
      color: ${({ theme }) => theme.fg.gray};
   }
`;

const TextWrapper = styled.div`
   margin-bottom: 20px;

   span {
      font-size: 18px;
      font-weight: 600;
      line-height: 1.3;
   }
`;

export { Container, Content, TextWrapper };
