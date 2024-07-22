import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export function schemaCheck() {
  return { status: "failure", message: "did not pass schema test" };
}

export function errorHandler(error: PrismaClientKnownRequestError) {
  console.log(error);
  if (!error.meta) error.meta = {};
  if (error.code === "P2002")
    return {
      status: "failure",
      message: `${error.meta.target} -- must be unique`,
    };
  return { status: "failure", message: "bad" };
}
