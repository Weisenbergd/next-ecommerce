import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { ZodError, ZodType } from "zod";

export function schemaCheck(error: unknown) {
  // todo fix any
  let errorArray: any = [];
  let imageErrors = 0;
  if (error instanceof ZodError) {
    for (let i = 0; i < error.issues.length; i++) {
      if (
        error.issues[i].message.match("File must be one of the following types")
      ) {
        imageErrors++;
        // console.log(error.issues[i]);
        errorArray.push([
          "imageError",
          error.issues[i].message,
          error.issues[i].path,
        ]);
      } else errorArray.push([error.issues[i].path, error.issues[i].message]);
    }
    console.log(errorArray);
    return { status: "error", message: errorArray };
  }

  return { status: "programming error", message: ["did not pass schema test"] };
}

export function errorHandler(error: PrismaClientKnownRequestError) {
  // console.log(error);
  if (!error.meta) error.meta = {};
  if (error.code === "P2002")
    return {
      status: "error",
      message: [`unique key constraint`, error.meta.target],
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
      message: ["record does not exist"],
    };
  }
  return {
    status: "error",
    message: ["programming error, this error not handled"],
  };
}
