"use client";
import { Select } from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import { useFormState } from "react-dom";

interface Row {
  id: number;
  name?: string;
  description?: string;
  productId?: number;
  sizeId?: number;
  colorId?: number;
  detailedColor?: string;
  price?: number;
  stock?: number;
  createdAt: Date;
  updatedAt: Date;
  image?: string;
  basePrice?: number;
  categoryId?: number;
  [key: string]: string | undefined | number | Date;
}

interface Props {
  head: string[];
  rows: Row[];
  deleteAction: (id: number) => Promise<{ status: string; message: string[] }>;
  editAction: (
    prevState: any,
    formData: FormData
  ) => Promise<{ status: string; message: string[] }>;
  name: string;
  selections?: {
    [key: string]: {
      id: number;
      name: string;
      description?: string;
      createdAt: Date;
      updatedAt: Date;
    }[];
  };
}

export default function TableAbstract(props: Props) {
  const [edit, setEdit] = useState({ edit: false, id: -1 });

  const handleEdit = (id: number) => {
    if (edit.edit === true) {
      if (edit.id === id) {
        return setEdit({ id: -1, edit: false });
      }
    }
    setEdit({ id, edit: true });
  };

  const initialState = {
    status: "",
    message: [""],
  };
  const [state, formAction] = useFormState(props.editAction, initialState);
  const [delState, setDelState] = useState(initialState);

  function trimDate(x: Date) {
    const date = x.getDate();
    const month = x.getMonth();
    const year = x.getFullYear();
    const hours = x.getHours();
    let minutes = x.getMinutes();
    let stringMinutes: string | number;
    if (minutes < 10) stringMinutes = "0" + minutes;
    else stringMinutes = minutes;
    const seconds = x.getSeconds();

    const trimDate =
      month + "/" + date + "/" + year + " " + hours + ":" + stringMinutes;

    return trimDate;
  }

  // selection state
  /* 
    dont know how to tie selection to form (maybe need to just wrap entire component in form)
    
    solution:
    using a form that doesn't submit to grab the values for the selections
    saving values to the state
    passing values to invisible input that used in different form
    edit button sets default values
  */

  const [selectionState, setSelectionState] = useState<{
    [key: string]: number;
  }>({
    productId: -1,
    sizeId: -1,
    colorId: -1,
    categoryId: -1,
  });

  useEffect(() => {
    if (state && state.status === "success") {
      setEdit({ edit: false, id: -1 });
    }
    if (state && state.status != "success" && state.status != "") {
      console.log(state);
    }

    if (delState && delState.status != "success" && delState.status != "") {
      console.log(delState);
    }
  }, [state, delState]);

  if (props.rows.length < 1) return <p>no {props.name}</p>;

  return (
    <Table>
      <TableHeader>
        <TableRow>
          {Object.keys(props.rows[0]).map((el: string, i) => {
            return <TableHead key={i + props.name}>{el}</TableHead>;
          })}
        </TableRow>
      </TableHeader>
      <TableBody>
        {props.rows.map((row: Row, i: number) => {
          return edit.edit == true &&
            edit.id === row.id &&
            row.id === edit.id ? (
            <TableRow id="rows-editing" key={i + props.name}>
              {Object.keys(row).map((cell) => {
                let j = -1;
                if (cell.endsWith("Id")) {
                  j++;
                  return (
                    <TableCell
                      className="relative"
                      key={row.id + cell + i + props.name}
                    >
                      <form
                        onChange={(e: any) => {
                          e.target.name === "productId" &&
                            setSelectionState({
                              ...selectionState,
                              productId: e.target.value,
                            });
                          e.target.name === "colorId" &&
                            setSelectionState({
                              ...selectionState,
                              colorId: e.target.value,
                            });
                          e.target.name === "sizeId" &&
                            setSelectionState({
                              ...selectionState,
                              sizeId: e.target.value,
                            });
                          e.target.name === "categoryId" &&
                            setSelectionState({
                              ...selectionState,
                              categoryId: e.target.value,
                            });
                        }}
                      >
                        <input
                          key={"input" + cell}
                          type="hidden"
                          form="editForm"
                          name={cell}
                          value={selectionState[cell]}
                        />
                        <Select name={cell}>
                          <SelectTrigger>
                            <SelectValue placeholder={row[cell]?.toString()} />
                          </SelectTrigger>
                          <SelectContent id="editForm">
                            {props.selections &&
                              Object.keys(props.selections).includes(cell) &&
                              props.selections[cell] &&
                              props.selections[cell].map((selection) => {
                                return (
                                  <SelectItem
                                    key={selection.id}
                                    value={selection.id.toString()}
                                    defaultValue={selection.id.toString()}
                                  >
                                    {selection.id + " - " + selection.name}
                                  </SelectItem>
                                );
                              })}
                          </SelectContent>
                        </Select>
                      </form>
                    </TableCell>
                  );
                } else {
                  if (
                    (row[cell] || row[cell] === "") &&
                    !["id", "createdAt", "updatedAt"].includes(cell)
                  ) {
                    return (
                      <TableCell key={row.id + cell + i + props.name}>
                        <input
                          className="text-black placeholder:text-black max-w-32"
                          type={
                            cell === "price" ||
                            cell === "stock" ||
                            cell === "basePrice"
                              ? "number"
                              : "text"
                          }
                          form="editForm"
                          name={cell}
                          defaultValue={row[cell].toString()}
                          step={
                            cell === "price" || cell === "basePrice" ? 0.01 : 1
                          }
                        />
                      </TableCell>
                    );
                  } else
                    return (
                      <TableCell key={row.id + cell + i + props.name}>
                        {typeof row[cell] === "object"
                          ? trimDate(row[cell])
                          : row[cell]!.toString()}
                      </TableCell>
                    );
                }
              })}
              <TableCell>
                <form hidden id="editForm" action={formAction}>
                  <input type="hidden" name="id" defaultValue={row.id} />
                </form>
                <div className="flex flex-col gap-4">
                  <button onClick={() => handleEdit(row.id)}>cancel</button>
                  <button form="editForm">submit</button>
                </div>
              </TableCell>
            </TableRow>
          ) : (
            <TableRow id="rows-not-editing" key={i + props.name}>
              {Object.keys(row).map((cell, j) => {
                if (row[cell] || row[cell] === "") {
                  return (
                    <TableCell
                      key={row.id.toString() + cell + j.toString() + props.name}
                    >
                      {typeof row[cell] === "object"
                        ? trimDate(row[cell])
                        : row[cell].toString()}
                    </TableCell>
                  );
                }
              })}
              <TableCell>
                <div className="flex flex-col gap-4">
                  <button
                    type="button"
                    onClick={() => {
                      handleEdit(row.id);
                      setSelectionState({
                        productId: props.rows[i].productId || -1,
                        sizeId: props.rows[i].sizeId || -1,
                        colorId: props.rows[i].colorId || -1,
                        categoryId: props.rows[i].categoryId || -1,
                      });
                    }}
                  >
                    edit
                  </button>
                  <button
                    onClick={async () => {
                      const del = await props.deleteAction(row.id);
                      del && setDelState(del);
                    }}
                  >
                    delete
                  </button>
                </div>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
