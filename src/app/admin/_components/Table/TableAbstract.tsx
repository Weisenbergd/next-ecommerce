"use client";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
} from "@/components/ui/table";
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

  // make sure head and rows are in same order!!
  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            {Object.keys(props.rows[0]).map((el: string, i) => {
              return <TableHead key={i + props.name}>{el}</TableHead>;
            })}
          </TableRow>
        </TableHeader>
        <TableBody>
          {props.rows.map((el: Row, i: number) => {
            return edit.edit == true &&
              edit.id === el.id &&
              el.id === edit.id ? (
              <TableRow key={i + el.id + props.name}>
                {el.id && (
                  <TableCell className="font-extrabold">{el.id}</TableCell>
                )}
                {el.name && (
                  <TableCell>
                    <input
                      className="text-black placeholder:text-black"
                      type="text"
                      form="editForm"
                      name="name"
                      defaultValue={el.name}
                    />
                  </TableCell>
                )}
                {el.description && (
                  <TableCell>
                    <input
                      className="text-black"
                      type="text"
                      form="editForm"
                      name="description"
                      defaultValue={el.description}
                    />
                  </TableCell>
                )}
                {el.categoryId && (
                  <TableCell>
                    <input
                      className="text-black"
                      type="text"
                      form="editForm"
                      name="categoryId"
                      defaultValue={el.categoryId}
                    />
                  </TableCell>
                )}
                {el.basePrice && (
                  <TableCell>
                    <input
                      className="text-black"
                      type="text"
                      form="editForm"
                      name="basePrice"
                      defaultValue={el.basePrice}
                    />
                  </TableCell>
                )}
                {(el.image === "" || el.image) && (
                  <TableCell>
                    <input
                      className="text-black"
                      type="text"
                      form="editForm"
                      name="image"
                      defaultValue={el.image}
                    />
                  </TableCell>
                )}

                {el.createdAt && (
                  <TableCell>{el.createdAt.toString()}</TableCell>
                )}
                {el.updatedAt && (
                  <TableCell>{el.updatedAt.toString()}</TableCell>
                )}
                <TableCell>
                  <form hidden id="editForm" action={formAction}>
                    <input type="hidden" name="id" defaultValue={el.id} />
                  </form>
                  <div className="flex flex-col gap-4">
                    <button onClick={() => handleEdit(el.id)}>cancel</button>
                    <button form="editForm">submit</button>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              <TableRow key={i + el.id + props.name}>
                {Object.keys(el).map((cell, i) => {
                  if (el[cell]) {
                    return (
                      <TableCell key={el.id + cell + i + props.name}>
                        {el[cell].toString()}
                      </TableCell>
                    );
                  } else return;
                })}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </>
  );
}

{
  /* {el.id && <TableCell>{el.id}</TableCell>}

                {el.productId && <TableCell>{el.productId}</TableCell>}
                {el.name && <TableCell>{el.name}</TableCell>}
                {el.description && <TableCell>{el.description}</TableCell>}
                {el.categoryId && <TableCell>{el.categoryId}</TableCell>}
                {el.detailedColor && <TableCell>{el.detailedColor}</TableCell>}
                {el.price && <TableCell>{el.price}</TableCell>}
                {el.stock && <TableCell>{el.stock}</TableCell>}
                {el.basePrice && <TableCell>{el.basePrice}</TableCell>}
                {(el.image === "" || el.image) && (
                  <TableCell>{el.image}</TableCell>
                )}
                {el.createdAt && (
                  <TableCell>{el.createdAt.toString()}</TableCell>
                )}
                {el.updatedAt && (
                  <TableCell>{el.updatedAt.toString()}</TableCell>
                )}
                {el.colorId && <TableCell>{el.colorId}</TableCell>}
                {el.sizeId && <TableCell>{el.sizeId}</TableCell>}
                <TableCell>
                  <div className="flex flex-col gap-4">
                    <button onClick={() => handleEdit(el.id)}>edit</button>
                    <button
                      onClick={async () => {
                        const del = await props.deleteAction(el.id);
                        del && setDelState(del);
                      }}
                    >
                      delete
                    </button>
                  </div>
                </TableCell> */
}
