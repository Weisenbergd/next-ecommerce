import Link from "next/link";
import { LayoutProps } from "../../../.next/types/app/layout";
import NavBar from "./_components/Nav/NavBar";
import Footer from "./_components/Foot/Footer";

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <NavBar />
      <main className="container px-1.5 mx-auto md:px-4 max-w-7xl mt-2 md:mt-10 mb-6 ">
        {children}
      </main>
      <Footer />
    </>
  );
};

export default Layout;
