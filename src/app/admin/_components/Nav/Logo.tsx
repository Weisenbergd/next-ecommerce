import Link from "next/link";
import TestScreenSize from "../TestScreenSize";

function Logo() {
  return (
    <>
      <div className="absolute left-6 text-2xl md:text-4xl z-[200]">
        <Link href="/admin/products">Logo</Link>
      </div>
      {/* <TestScreenSize /> */}
    </>
  );
}
export default Logo;
