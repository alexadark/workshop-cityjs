import { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  console.log(
    "%croot component is rendering",
    "color: blue; font-weight: bold;"
  );
  return (
    <div className="flex flex-col min-h-screen ">
      <Header />
      <main className="flex-grow  py-10 prose dark:prose-invert max-w-none">
        <div className="container">{children}</div>
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
