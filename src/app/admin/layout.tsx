import Link from "next/link";
import { LayoutProps } from "../../../.next/types/app/layout";
import NavBar from "./_components/Nav/NavBar";
import Footer from "./_components/Foot/Footer";

const Layout = ({ children }: LayoutProps) => {
  // min-h-[calc(100vh-(var(--footerHeight)-var(--navHeight)))]

  return (
    <div className="min-h-screen grid grid-rows-[1fr_auto]">
      <NavBar />
      <main className="mt-6 md:mt-10 container px-1.5 mx-auto md:px-4 max-w-7xl min-h-[calc(100vh-1.5rem-(var(--footerHeight)+var(--navHeight)))] md:min-h-[calc(100vh-2.5rem-(var(--footerHeight)+var(--navHeight)))] ">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
