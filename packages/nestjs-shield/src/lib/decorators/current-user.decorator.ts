import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { pipe } from "fp-tk";
import { foldContext } from "../utils/fold-context.utils";

export const CurrentUser = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    return pipe(
      ctx,
      foldContext(
        (ctx) => {
          const request = ctx.getRequest();
          const user = request.user;
          return data ? user?.[data] : user;
        },
        (ctx) => {
          const context = ctx.getContext();
          const user = context.user;
          return data ? user?.[data] : user;
        }
      )
    );
  }
);
