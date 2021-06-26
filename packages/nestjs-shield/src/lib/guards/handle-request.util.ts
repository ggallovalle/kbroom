import { boolean, pipe } from "fp-tk";
import { foldContext } from "../utils/fold-context.utils";
import { UnauthorizedException } from "@nestjs/common";
import { AuthenticationError } from "apollo-server-errors";

export const handleRequest = (err, user, info, context, status) =>
  pipe(
    err || !user,
    boolean.fold(
      () => user,
      () => {
        pipe(
          context,
          foldContext(
            (ctx) => {
              throw new UnauthorizedException("");
            },
            (ctx) => {
              throw new AuthenticationError("");
            }
          )
        );
      }
    )
  );
