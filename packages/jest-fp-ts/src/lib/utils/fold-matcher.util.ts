import { ExpectationResult } from "expect/build/types";
import { boolean, Lazy, pipe, Predicate } from "fp-tk";

const pass = (message: Lazy<string>): ExpectationResult => ({
  pass: true,
  message,
});

const fail = (message: Lazy<string>): ExpectationResult => ({
  pass: false,
  message,
});

export const foldMatcher = (
  predicate: Predicate<unknown>,
  messages: { pass: Lazy<string>; fail: Lazy<string> }
) => (received: unknown) =>
  pipe(
    predicate(received),
    boolean.fold(
      () => fail(messages.fail),
      () => pass(messages.pass)
    )
  );
