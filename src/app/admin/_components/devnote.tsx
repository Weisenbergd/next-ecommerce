"use client";
import { useState } from "react";

export default function DevNote() {
  const [open, setOpen] = useState(false);

  return (
    <div className="absolute bg-green-400 h-fit w-fit top-16 right-0 z-50">
      {open && (
        <ul>
          <li>not connected to any storefront</li>
          <li>didn't both with authentication</li>
          <li>feel free to use</li>
          <li>not requiring pics</li>
        </ul>
      )}
      <button onClick={() => setOpen(!open)}>
        {open ? "close" : "devnote"}
      </button>
    </div>
  );
}
