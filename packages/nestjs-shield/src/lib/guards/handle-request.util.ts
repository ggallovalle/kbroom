import { boolean, pipe } from "fp-tk";
import { foldContext } from "@kbroom/nestjs-contextor";
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
          foldContext({
            graphql: () => {
              throw new AuthenticationError("");
            },
            http: () => {
              throw new UnauthorizedException("");
            },
          })
        );
      }
    )
  );
