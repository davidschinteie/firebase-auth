import React from "react";
import "../styles/global.css";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return <main>{children}</main>;
};

export default Layout;
