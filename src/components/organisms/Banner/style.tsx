import styled from '@emotion/styled';

interface BannerWrapperProps {
   url: string;
}

const Container = styled.div`
   height: 100vh;
`;

const BannerWrapper = styled.div<BannerWrapperProps>`
   background: ${({ url }) => `center / cover no-repeat url(${url})`};
   height: 100%;
   width: 100%;
`;

export { Container, BannerWrapper };
