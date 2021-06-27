import { ExpectationResult } from "expect/build/types";
import { boolean, pipe, Predicate } from "fp-tk";
type MatcherMsgFolder = (received: unknown) => () => string;
const passFlow = (msgCreator: MatcherMsgFolder) => (
  received: unknown
): ExpectationResult => ({
  pass: true,
  message: msgCreator(received),
});

const failFlow = (msgCreator: MatcherMsgFolder) => (
  received: unknown
): ExpectationResult => ({
  pass: false,
  message: msgCreator(received),
});

export const foldMatcher = (
  predicate: Predicate<unknown>,
  messages: { onPass: MatcherMsgFolder; onFail: MatcherMsgFolder },
  contrapart?: Predicate<unknown>
) => (received: unknown, expected: unknown, options: any) =>
  // ) => (received: unknown, expected: any, options?: any) =>
  pipe(
    predicate(received),
    boolean.fold(
      () => failFlow(messages.onFail)(received),
      () => passFlow(messages.onPass)(received)
    )
  );
