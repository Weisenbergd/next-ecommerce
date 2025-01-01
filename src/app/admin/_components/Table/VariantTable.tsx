"use client";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ChangeEvent, useEffect, useState } from "react";

type Props = {
  variantColors: {
    color: string;
    id: string;
  }[];
  variantSizes: {
    size: string;
    id: string;
  }[];
  form?: string;
};

function VariantTable({ variantColors, variantSizes, form }: Props) {
  // need state update to refresh when checkbox checked/unchecked
  const [something, setSomething] = useState(0);
  const [board, setBoard] = useState<number[][]>([]);

  // fixed so that now should be updating
  useEffect(() => {
    // Initialize the board whenever variantColors or variantSizes changes
    const grid = variantColors.map(() => {
      return variantSizes.map(() => 1); // Set initial value to 1 (checked) for each combination of color and size
    });
    setBoard(grid);
  }, [variantColors, variantSizes]);

  // making checkboxes controlled so to update table
  function handleCheck(e: ChangeEvent<HTMLInputElement>, i: number, j: number) {
    const newBoard = [...board];
    newBoard[i][j] = e.target.checked ? 1 : 0;
    setBoard(newBoard);
  }

  // don't change any of the name properties !!!!! important !!!!
  // reexamine this component -- why im using hidden inputs again ??
  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="">Color</TableHead>
            <TableHead className="">Images</TableHead>
            <TableHead className="">Description</TableHead>
            <TableHead className="">Variants</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {variantColors.map((color, i) => {
            return (
              <TableRow key={color.color}>
                <TableCell>{color.color}</TableCell>
                <TableCell>
                  <Input
                    type="file"
                    multiple
                    name={i + ":" + color.color + ";images"}
                    form={form}
                  />
                </TableCell>
                <TableCell>
                  <Input
                    name={i + ":" + color.color + ";description"}
                    form={form}
                  />
                </TableCell>
                <TableCell>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="">Add</TableHead>
                        <TableHead>Size</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Inventory</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {variantSizes.map((size, j) => {
                        return (
                          <TableRow key={size.size}>
                            <TableCell>
                              {/* <input
                                hidden
                                name="varVar"
                                defaultValue={j}
                                form={form}
                              /> */}
                              <Input
                                className="min-w-3"
                                type="checkbox"
                                checked={board[i]?.[j] === 1}
                                onChange={(e) => handleCheck(e, i, j)}
                                form="used to manage state for hidden input bellow"
                                name={
                                  i +
                                  ":" +
                                  j +
                                  ":" +
                                  color.color +
                                  ";" +
                                  size.size +
                                  ";add"
                                }
                              />
                              <Input
                                key={board[i]?.[j]}
                                className="min-w-3"
                                defaultValue={board[i]?.[j] || 0}
                                type="hidden"
                                checked={board[i]?.[j] === 1 || true}
                                onChange={(e) => handleCheck(e, i, j)}
                                name={
                                  i +
                                  ":" +
                                  j +
                                  ":" +
                                  color.color +
                                  ";" +
                                  size.size +
                                  ";add"
                                }
                                form={form}
                              />

                              <input
                                name={
                                  i +
                                  ":" +
                                  j +
                                  ":" +
                                  color.color +
                                  ";" +
                                  size.size +
                                  ";sizeId"
                                }
                                type="hidden"
                                value={size.id}
                                form={form}
                              />
                              <input
                                name={
                                  i +
                                  ":" +
                                  j +
                                  ":" +
                                  color.color +
                                  ";" +
                                  size.size +
                                  ";colorId"
                                }
                                type="hidden"
                                value={color.id}
                                form={form}
                              />
                            </TableCell>
                            <TableCell>{size.size}</TableCell>
                            <TableCell>
                              <input
                                className="bg-black "
                                type="number"
                                defaultValue={0}
                                step={0.01}
                                required={board[i]?.[j] === 1 ? true : false}
                                min={board[i]?.[j] === 1 ? 0.01 : 0}
                                name={
                                  i +
                                  ":" +
                                  j +
                                  ":" +
                                  color.color +
                                  ";" +
                                  size.size +
                                  ";price"
                                }
                                form={form}
                              />
                            </TableCell>
                            <TableCell>
                              <input
                                className="bg-black "
                                type="number"
                                defaultValue={0}
                                name={
                                  i +
                                  ":" +
                                  j +
                                  ":" +
                                  color.color +
                                  ";" +
                                  size.size +
                                  ";inventory"
                                }
                                form={form}
                              />
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </>
  );
}
export default VariantTable;
