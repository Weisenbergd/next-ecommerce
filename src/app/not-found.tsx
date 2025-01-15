import Link from "next/link";

export default function page() {
  return (
    <div>
      <p>this page does not exist</p>
      <Link href="/admin">Got to admin panel</Link>
    </div>
  );
}
