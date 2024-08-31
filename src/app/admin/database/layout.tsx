import Link from "next/link";
import { LayoutProps } from "../../../../.next/types/app/layout";

const Layout = ({ children }: LayoutProps) => {
  const tables = [
    {
      name: "Products",
      link: "/admin/products",
    },
    { name: "Colors", link: "/admin/database/colors" },
    { name: "Sizes", link: "/admin/database/sizes" },
    { name: "Categories", link: "/admin/database/categories" },
    { name: "Images", link: "/admin/database/images" },
  ];
  return (
    <div>
      <ul>
        {tables.map((el) => {
          return (
            <Link key={el.name} href={el.link}>
              {el.name}
            </Link>
          );
        })}
      </ul>
      <div>{children}</div>
    </div>
  );
};

export default Layout;
