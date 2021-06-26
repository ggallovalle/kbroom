import { HttpArgumentsHost } from "@nestjs/common/interfaces";
import { GqlContextType, GqlExecutionContext } from "@nestjs/graphql";
import { ExecutionContext } from "@nestjs/common";

export const foldContext = (
  http: (ctx: HttpArgumentsHost) => any,
  gql: (ctx: GqlExecutionContext) => any
) => (context: ExecutionContext) => {
  let ctx;
  switch (context.getType<GqlContextType>()) {
    case "graphql": {
      ctx = GqlExecutionContext.create(context);
      return gql(ctx);
    }
    case "http": {
      ctx = context.switchToHttp();
      return http(ctx);
    }
    default: {
      throw new Error(
        `ArgumentHost context: ${context.getType()} is not being handled`
      );
    }
  }
};
