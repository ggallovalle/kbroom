import { ExecutionContext, Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { handleRequest } from "./handle-request.util";
import { pipe } from "fp-tk";
import { foldContext } from "../utils/fold-context.utils";

@Injectable()
export class JwtGuard extends AuthGuard("jwt") {
  getRequest(executionContext: ExecutionContext) {
    return pipe(
      executionContext,
      foldContext(
        (ctx) => ctx.getRequest(),
        (ctx) => {
          const context = ctx.getContext();
          if (typeof context.headers?.authorization === "undefined") {
            throw new Error(
              "Please use helper function`getGraphqlToken` of @kbroom/nestjs-shield inside context function in Apollo constructor"
            );
          }
          return context;
        }
      )
    );
  }

  /**
   * this is execute after the strategy
   */
  handleRequest(err, user, info, context, status) {
    return handleRequest(err, user, info, context, status);
  }
}
