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
};

function VariantTable({ variantColors, variantSizes }: Props) {
  // need state update to refresh when checkbox checked/unchecked
  const [something, setSomething] = useState(0);
  const [board, setBoard] = useState<number[][]>([[], []]);

  useEffect(() => {
    let grid = [];
    for (let color of variantColors) {
      let axis = [];
      for (let size of variantSizes) {
        axis.push(1);
      }
      grid.push(axis);
    }
    setBoard(grid);
  }, []);

  function handleCheck(e: ChangeEvent<HTMLInputElement>, i: number, j: number) {
    if (e.target.checked === true) {
      let x = board;
      x[i][j] = 1;
      setBoard(x);
    }

    if (e.target.checked === false) {
      let x = board;
      x[i][j] = 0;
      setBoard(x);
    }
  }
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
                  />
                </TableCell>
                <TableCell>
                  <Input name={i + ":" + color.color + ";description"} />
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
                              <input hidden name="varVar" defaultValue={j} />
                              <Input
                                className="min-w-3"
                                type="checkbox"
                                defaultChecked
                                onChange={(e) => {
                                  setSomething(something + 1);
                                  handleCheck(e, i, j);
                                }}
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
                                key={board[i][j]}
                                className="min-w-3"
                                defaultValue={
                                  board[i][j] ? board[i][j].valueOf() : 0
                                }
                                type="hidden"
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
                              />
                            </TableCell>
                            <TableCell>{size.size}</TableCell>
                            <TableCell>
                              <input
                                className="bg-black "
                                type="number"
                                defaultValue={0}
                                step={0.01}
                                required={board[i][j] === 1 ? true : false}
                                min={board[i][j] === 1 ? 0.01 : 0}
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
