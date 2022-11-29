import React, { ReactNode } from "react";
import Footer from "components/organisms/Footer";

interface Props {
  children: ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <div>
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
