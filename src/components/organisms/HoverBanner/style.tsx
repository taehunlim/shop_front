import styled from '@emotion/styled';

const Container = styled.div`
   height: fit-content;
   margin: 0 30px;
`;

const BannerContainer = styled.div`
   position: relative;
   overflow: hidden;

   img {
      width: 100%;
      transition: 0.8s;

      :hover {
         transform: scale(1.2);
      }
   }
`;

export { Container, BannerContainer };
