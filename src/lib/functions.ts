"use client";

import { usePathname, useSearchParams } from "next/navigation";

export const formatDateTime = (date: Date) => {
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const seconds = date.getSeconds().toString().padStart(2, "0");

  const formattedDate = `${month}/${day}/${year}`;
  const formattedTime = `${hours}:${minutes}:${seconds}`;

  return { formattedDate, formattedTime };
};

export const getPath = () => {
  const path = usePathname();
  return path;
};

export function getParams() {
  const searchParams = useSearchParams();
  return searchParams;
}
