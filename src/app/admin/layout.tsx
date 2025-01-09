import Link from "next/link";
import { LayoutProps } from "../../../.next/types/app/layout";
import NavBar from "./_components/Nav/NavBar";

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <NavBar />
      <main className="container px-1.5 mx-auto md:px-4 max-w-7xl mt-2 md:mt-10 mb-12 md:mb-32">
        {children}
      </main>
    </>
  );
};

export default Layout;
