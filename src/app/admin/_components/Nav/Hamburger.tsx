"use client";

import { Dispatch, SetStateAction } from "react";

type Props = {
  setOpenHamburger: Dispatch<SetStateAction<boolean>>;
  openHamburger: boolean;
};

export default function Hamburger({ openHamburger, setOpenHamburger }: Props) {
  return (
    <>
      <button
        className="md:hidden flex items-center flex-col justify-center space-y-1 w-8 h-8 z-[200]  "
        onClick={() => setOpenHamburger(!openHamburger)}
        aria-label="Toggle Menu"
      >
        <span
          className={`h-1 w-full transition-all duration-300  ${
            openHamburger
              ? "rotate-45 translate-y-2 bg-foreground"
              : "bg-primary-foreground"
          }`}
        ></span>
        <span
          className={`h-1 w-full transition-all duration-300 ${
            openHamburger ? "opacity-0 " : "bg-primary-foreground"
          }`}
        ></span>
        <span
          className={`h-1 w-full transition-all duration-300 ${
            openHamburger
              ? "-rotate-45 -translate-y-2 bg-foreground"
              : "bg-primary-foreground"
          }`}
        ></span>
      </button>
    </>
  );
}
