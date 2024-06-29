"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { addProducts } from "../_actions/products";

export default function AddProductForm() {
  return (
    <div>
      <form action={addProducts} className="flex flex-col gap-4 items-start">
        <Label className="text-4xl">test</Label>
        <Input className="text-4xl" />
        <button>click me</button>
      </form>
    </div>
  );
}
