import Link from "next/link";
import { LayoutProps } from "../../../.next/types/app/layout";

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <nav className="bg-secondary text-secondary-foreground h-24 flex items-center justify-center text-2xl md:text-4xl md:h-30">
        <div className="flex justify-between gap-10 md:gap-14">
          {navItem.map((el) => {
            return (
              <Link key={el.name} href={el.link}>
                {el.name}
              </Link>
            );
          })}
        </div>
      </nav>
      <main className="xl:w-[1200px] w-screen text-2xl lg:text-4xl px-4 md:px-10 lg:w-[1000px] py-24 ml-auto mr-auto bg-background">
        {children}
      </main>
    </>
  );
};

const navItem = [
  { name: "Dashboard", link: "/admin" },
  { name: "Products", link: "/admin/products" },
  { name: "Orders", link: "/admin/orders" },
  { name: "Stock", link: "/admin/stock" },
];

export default Layout;
