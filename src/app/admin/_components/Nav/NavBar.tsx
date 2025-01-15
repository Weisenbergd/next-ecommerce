"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState } from "react";
import Hamburger from "./Hamburger";
import Logo from "./Logo";

export default function NavBar() {
  const navItem = [
    { name: "New Product", link: "/admin/add-product" },
    { name: "Products", link: "/admin/products" },
    { name: "Orders", link: "/admin/orders" },
    { name: "Stock", link: "/admin/stock" },
    { name: "Database", link: "/admin/database" },
  ];

  const [openHamburger, setOpenHamburger] = useState(false);

  return (
    <nav className="bg-primary text-primary-foreground">
      <div className="h-navHeight flex items-center justify-end lg:justify-center px-4 md:px-8 relative">
        <Logo />
        <Hamburger
          openHamburger={openHamburger}
          setOpenHamburger={setOpenHamburger}
        />

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-14 text-lg">
          {navItem.map((el) => (
            <Link key={el.name} href={el.link} className="hover:underline">
              {el.name}
            </Link>
          ))}
        </div>
      </div>

      {/* Mobile (Full-Screen) Menu */}
      <div
        className={`md:hidden bg-background text-foreground fixed top-0 left-0 w-full h-full z-[100] flex items-start justify-center transform transition-all duration-300 ${
          openHamburger
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex flex-col items-center gap-10 mt-40">
          {navItem.map((el) => (
            <Link
              key={el.name}
              href={el.link}
              className="text-xl md:text-4xl hover:underline"
              onClick={() => setOpenHamburger(false)} // todo!: add loading spinner
            >
              {el.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
