import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { ZodError, ZodType } from "zod";

export function schemaCheck(error: unknown) {
  console.log(error);
  let errorArray: string[] = [];
  if (error instanceof ZodError) {
    for (let i = 0; i < error.issues.length; i++) {
      errorArray.push(error.issues[i].path + " " + error.issues[i].message);
    }
    return { status: "error", message: errorArray };
  }

  return { status: "programming error", message: ["did not pass schema test"] };
}

export function errorHandler(error: PrismaClientKnownRequestError) {
  console.log(error);
  if (!error.meta) error.meta = {};
  if (error.code === "P2002")
    return {
      status: "error",
      message: [`${error.meta.target} -- must be unique`],
    };
  if (error.code === "P2003") {
    return {
      status: "error",
      message: [
        `Foregin key constraint failed, being used in: ${error.meta.field_name}`,
      ],
    };
  }
  if (error.code === "P2025") {
    return {
      status: "error",
      message: ["record to delete does not exist"],
    };
  }
  return { status: "programming error", message: ["this error not handled"] };
}
