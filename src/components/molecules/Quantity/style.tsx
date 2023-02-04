import styled from '@emotion/styled';

const Container = styled.div`
   margin-bottom: 20px;
   padding: 10px 0;
   input {
      font-size: 16px;
      font-weight: 500;
      width: 80px;
      margin-bottom: 0;
      padding: 0 15px;
      text-align: center;
      vertical-align: middle;
      color: ${({ theme }) => theme.fg.black};
      border: none;
   }
`;

export { Container };
