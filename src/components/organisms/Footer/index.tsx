import React from "react";
import { Link } from "react-router-dom";

import {
  StyledFooter,
  Container,
  Logo,
  CopyLight,
  ColTitle,
  StyledCol,
} from "./style";

const Footer = () => {
  return (
    <StyledFooter>
      <Container>
        <StyledCol>
          <Logo>
            <img alt="Logo" />
          </Logo>
          <CopyLight>
            &copy; {new Date().getFullYear() + " "}
            <Link to="#">Brand Name</Link> <span>All Rights Reserved</span>
          </CopyLight>
        </StyledCol>

        <StyledCol>
          <ColTitle>ABOUT</ColTitle>
          <nav>
            <ul>
              <li>About us</li>
              <li>Contact us</li>
            </ul>
          </nav>
        </StyledCol>

        <StyledCol>
          <ColTitle>POLICY</ColTitle>
          <nav>
            <ul>
              <li>
                <Link to="/">Exchange & Refund</Link>
              </li>

              <li>
                <Link to="/">Privacy policy</Link>
              </li>

              <li>
                <Link to="/">Terms & Conditions</Link>
              </li>
            </ul>
          </nav>
        </StyledCol>
        <StyledCol>
          <ColTitle>ORDERS</ColTitle>
          <nav>
            <ul>
              <li>
                <Link to="/">My account</Link>
              </li>

              <li>
                <Link to="/">Delivery information</Link>
              </li>

              <li>
                <Link to="/">Track my oder</Link>
              </li>
            </ul>
          </nav>
        </StyledCol>
      </Container>
    </StyledFooter>
  );
};

export default Footer;
