"use client";

import { Button } from "@/components/ui/button";
import { useSearchParams } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";

export default function ShowHideWrapper({
  children,
  x,
}: {
  children: ReactNode;
  x: string;
}) {
  useEffect(() => {
    window.history.pushState(null, "", "?items=");
  }, []);
  const [showChildren, setShowChildren] = useState(false);
  const searchParams = useSearchParams();
  const search = searchParams.get("items");

  useEffect(() => {
    console.log(showChildren);
  }, [search]);

  // have to render only one at a time
  // otherwise multiple form state overwrite each other

  return (
    <>
      <h2
        onClick={() => {
          window.history.pushState(null, "", `?items=${x}`);
          if (showChildren === true && search === x) {
            setShowChildren(false);
          } else if (search === x) {
            setShowChildren(true);
          } else setShowChildren(true);
        }}
        className="cursor-pointer"
      >
        {showChildren && search === x ? x + " V" : x + " >"}
      </h2>
      {showChildren && search === x && <div>{children}</div>}
    </>
  );
}
