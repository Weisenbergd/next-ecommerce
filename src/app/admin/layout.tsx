import { LayoutProps } from "../../../.next/types/app/layout";
import NavBar from "./_components/Nav/NavBar";
import Footer from "./_components/Foot/Footer";

const Layout = ({ children }: LayoutProps) => {
  // main min-height: screen - margin - footerHeight - nav Height

  return (
    <>
      <NavBar />
      <main className="mt-6 mb-6 md:mt-10 container px-1.5 mx-auto md:px-4 max-w-7xl min-h-[calc(100vh-3rem-(var(--footerHeight)+var(--navHeight)))] md:min-h-[calc(100vh-4rem-(var(--footerHeight)+var(--navHeight)))]">
        {children}
      </main>
      <Footer />
    </>
  );
};

export default Layout;
