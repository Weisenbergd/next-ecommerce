import Link from "next/link";
import { LayoutProps } from "../../../.next/types/app/layout";
import NavBar from "./_components/Nav/NavBar";

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <NavBar />
      <main className="container mx-auto px-4 max-w-7xl mt-2 md:mt-10">
        {children}
      </main>
    </>
  );
};

export default Layout;
