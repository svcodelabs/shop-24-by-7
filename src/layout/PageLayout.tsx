import React, { ReactNode } from "react";
import Footer from "../components/Footer";

interface LayoutProps {
  children: ReactNode;
}

const PageLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
};

export default PageLayout;
