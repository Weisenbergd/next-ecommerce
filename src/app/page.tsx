import Link from "next/link";
import { notFound } from "next/navigation";

export default function Home() {
  return (
    <div>
      <Link href="./admin">To Admin &#8594;</Link>
      <div>insert storefront here</div>
    </div>
  );
}
