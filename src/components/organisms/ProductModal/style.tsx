import styled from '@emotion/styled';

const Container = styled.div`
   display: grid;
   grid-template-columns: 0.8fr 1fr;
`;

const Content = styled.div`
   padding: 30px;

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
      margin-bottom: 30px;
   }
`;

const ImgWrapper = styled.div`
   position: relative;
   width: 100%;
   padding-top: ${(100 * 4) / 3}%;

   img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      object-fit: contain;
      height: auto;
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

const ButtonContainer = styled.div`
   display: flex;
   gap: 10px;
`;

export { Container, Content, ImgWrapper, TextWrapper, ButtonContainer };
