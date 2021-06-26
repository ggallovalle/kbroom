import { HttpArgumentsHost } from "@nestjs/common/interfaces";
import { GqlContextType, GqlExecutionContext } from "@nestjs/graphql";
import { ExecutionContext } from "@nestjs/common";
import { hostNotHandled } from "./context-not-handled.util";

export const foldContext = (contexts: {
  http?: (ctx: HttpArgumentsHost) => any;
  graphql?: (ctx: GqlExecutionContext) => any;
}) => (executionContext: ExecutionContext) => {
  let ctx;
  switch (executionContext.getType<GqlContextType>()) {
    case "graphql": {
      ctx = GqlExecutionContext.create(executionContext);

      if (typeof contexts.graphql !== "function") {
        hostNotHandled(executionContext);
      }
      return contexts.graphql(ctx);
    }
    case "http": {
      ctx = executionContext.switchToHttp();
      if (typeof contexts.http !== "function") {
        hostNotHandled(executionContext);
      }
      return contexts.http(ctx);
    }
    default: {
      hostNotHandled(executionContext);
    }
  }
};
