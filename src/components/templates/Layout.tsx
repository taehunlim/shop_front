import React, { ReactNode } from "react";

import Header from "components/organisms/Header";
import Footer from "components/organisms/Footer";

interface Props {
  children: ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
