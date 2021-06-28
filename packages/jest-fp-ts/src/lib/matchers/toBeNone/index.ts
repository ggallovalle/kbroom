import { MatchersObject, MatcherState } from "expect/build/types";
import { ensureNoExpected, MatcherHintOptions } from "jest-matcher-utils";
import { isNotPredicate, isNotPredicateExpected, predicate } from "./predicate";
import { printer, SHOULD_NEVER_HAPPEN } from "../../utils/printer.util";
import { option } from "fp-tk";

export default {
  toBeNone(this: MatcherState, received: unknown, expected: unknown) {
    const matcherName = "toBeNone";
    let pass: boolean;
    let message: () => string;
    const options: MatcherHintOptions = {
      isNot: this.isNot,
      promise: this.promise,
      comment: "fp-ts Option isNone check",
    };
    if (!this.isNot) {
      ensureNoExpected(expected, matcherName, options);
      pass = predicate(received);
      message = pass
        ? () => SHOULD_NEVER_HAPPEN
        : () =>
            printer(matcherName, received, option.none, options, this.expand);
    } else {
      if (expected) {
        pass = !isNotPredicateExpected(received, expected);
        message = pass
          ? () => printer(matcherName, received, expected, options, this.expand)
          : () => SHOULD_NEVER_HAPPEN;
      } else {
        pass = !isNotPredicate(received);
        message = pass
          ? () =>
              printer(matcherName, received, undefined, options, this.expand)
          : () => SHOULD_NEVER_HAPPEN;
      }
    }
    return {
      pass,
      name: matcherName,
      message,
      actual: received,
      expected,
    };
  },
} as MatchersObject;
