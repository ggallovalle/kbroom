import { ExecutionContext, Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { pipe } from "fp-tk";
import { foldContext } from "../utils/fold-context.utils";
import { handleRequest } from "./handle-request.util";

@Injectable()
export class LocalGuard extends AuthGuard("local") {
  getRequest(context: ExecutionContext) {
    return pipe(
      context,
      foldContext(
        (ctx) => ctx.getRequest(),
        (ctx) => {
          const args = ctx.getArgs();
          /**
           * passport strategy loos into tue rq.body and req.query
           */
          const req: { body: any } = {
            body: args,
          };
          return req;
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
