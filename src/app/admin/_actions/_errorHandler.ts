import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { ZodError, ZodType } from "zod";

export function schemaCheck(error: unknown) {
  let errorArray: string[] = [];
  if (error instanceof ZodError) {
    for (let i = 0; i < error.issues.length; i++) {
      console.log(error.issues.length);
      errorArray.push(error.issues[i].message);
    }
    return { status: "error", message: errorArray };
  }

  return { status: "error", message: ["did not pass schema test"] };
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
  return { status: "error", message: ["bad"] };
}
