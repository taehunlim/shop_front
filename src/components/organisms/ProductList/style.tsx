import styled from '@emotion/styled';

const Container = styled.div`
   display: flex;
   flex-wrap: wrap;
   justify-content: space-between;
   gap: 15px;

   margin: 0 30px;
`;

const Wrapper = styled.div`
   flex: 1 0 calc(33.33% - 15px);
   max-width: calc(33.33% - 15px);
`;

export { Container, Wrapper };
