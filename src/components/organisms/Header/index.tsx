import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

import Navigation from "../Navigation";

import { StyledHeader, Container, LogoWrapper, IconContainer } from "./style";

const Header = () => {
  const ref = useRef<HTMLHeadElement>(null);
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    if (ref.current) {
      window.addEventListener("scroll", handleScroll);

      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }
  }, [ref]);

  const handleScroll = () => {
    const headerHeight = ref.current!.offsetHeight;

    if (window.scrollY > headerHeight) {
      return setIsSticky(true);
    }
    setIsSticky(false);
  };

  return (
    <StyledHeader ref={ref} isSticky={isSticky}>
      <Container>
        <LogoWrapper>
          <Link to="/">
            <img alt="logo" />
          </Link>
        </LogoWrapper>
        <Navigation />
        <IconContainer>
          <ul>
            <li>
              <button>S</button>
            </li>
            <li>
              <button>P</button>
            </li>
            <li>
              <button>H</button>
            </li>
            <li>
              <button>C</button>
            </li>
          </ul>
        </IconContainer>
      </Container>
    </StyledHeader>
  );
};

export default Header;
