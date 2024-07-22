"use client";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useFormState } from "react-dom";

interface Props {
  head: string[];
  rows: any;
  deleteAction: (
    id: number
  ) => Promise<{ status: string; message: string } | undefined>;
  editAction: (
    prevState: any,
    formData: FormData
  ) => Promise<{ status: string; message: string }>;
  name: string;
}

export default function TableAbstract(props: Props) {
  const [edit, setEdit] = useState({ edit: false, id: -1 });
  const [newName, setNewName] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [target, setTarget] = useState("");

  const handleEdit = (id: number) => {
    if (edit.edit === true) {
      if (edit.id === id) {
        return setEdit({ id: -1, edit: false });
      }
    }
    setEdit({ id, edit: true });
    setTarget(props.name);
  };

  const initialState = {
    status: "",
    message: "",
  };
  const [state, formAction] = useFormState(props.editAction, initialState);

  useEffect(() => {
    if (state && state.status === "success") {
      setNewName("");
      setNewDescription("");
      setEdit({ edit: false, id: -1 });
      setTarget("");
    }
    if (state && state.status != "success" && state.status != "")
      console.log(state);
  }, [state]);

  useEffect(() => {
    setNewName("");
    setNewDescription("");
    setTarget(props.name);
  }, [edit]);

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            {props.head.map((el: any, i) => {
              return <TableHead key={el + i}>{el}</TableHead>;
            })}
          </TableRow>
        </TableHeader>
        <TableBody>
          {props.rows.map((el: any, i: number) => {
            return edit.edit == true &&
              edit.id === el.id &&
              el.id === edit.id ? (
              <TableRow key={el.id + i}>
                {el.id && (
                  <TableCell className="font-extrabold">{el.id}</TableCell>
                )}
                {el.name && (
                  <TableCell>
                    <input
                      className="text-black"
                      onChange={(e) => setNewName(e.target.value)}
                      type="text"
                      value={newName === "" ? el.name : newName}
                      form="editForm"
                      name="name"
                    />
                  </TableCell>
                )}
                {el.description && (
                  <TableCell>
                    <input
                      className="text-black"
                      onChange={(e) => setNewDescription(e.target.value)}
                      type="text"
                      value={
                        newDescription === "" ? el.description : newDescription
                      }
                      form="editForm"
                      name="description"
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
              <TableRow key={el.id + i}>
                {el.id && <TableCell>{el.id}</TableCell>}
                {el.name && <TableCell>{el.name}</TableCell>}
                {el.description && <TableCell>{el.description}</TableCell>}
                {el.createdAt && (
                  <TableCell>{el.createdAt.toString()}</TableCell>
                )}
                {el.updatedAt && (
                  <TableCell>{el.updatedAt.toString()}</TableCell>
                )}
                <TableCell>
                  <div className="flex flex-col gap-4">
                    <button onClick={() => handleEdit(el.id)}>edit</button>
                    <button onClick={() => props.deleteAction(el.id)}>
                      delete
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </>
  );
}
