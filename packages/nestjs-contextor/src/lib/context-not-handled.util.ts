import { ExecutionContext } from "@nestjs/common";
import { HostNotHandledException } from "./exeptions/host-not-handled.exception";

export const hostNotHandled = (context: ExecutionContext) => {
  throw new HostNotHandledException(
    `ArgumentHost context: ${context.getType()} is not being handled`
  );
};
