import styled from "@emotion/styled";

const StyledFooter = styled.footer`
  background-color: #f8f8f8;
  padding: 100px 0 50px;
`;

const Container = styled.div`
  width: 95%;
  display: flex;
  flex-wrap: wrap;
  margin: auto;
`;

const StyledCol = styled.div`
  flex-basis: 17.5%;
  flex-grow: 1;
  min-width: 0;
  max-width: 100%;

  padding: 0 15px;
  margin-bottom: 50px;

  li {
    margin-bottom: 30px;
    font-size: 15px;
    line-height: 1.3;
    position: relative;
    color: #999999;

    :last-child {
      margin-bottom: 0;
    }
  }

  &:last-child {
    flex-basis: 100%;
    max-width: 30%;
  }
`;

const ColTitle = styled.h5`
  font-size: 14px;
  font-weight: 600;

  margin: 0 0 30px;
  color: #333;
`;

const Logo = styled.div`
  margin-bottom: 35px;

  img {
    max-width: 100%;
    height: auto;
  }
`;

const CopyLight = styled.div`
  font-size: 15px;
  line-height: 2;
  color: #777777;
`;

export { StyledFooter, Container, ColTitle, StyledCol, Logo, CopyLight };
