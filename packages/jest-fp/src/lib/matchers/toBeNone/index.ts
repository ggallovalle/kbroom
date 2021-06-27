import { matcherHint, printExpected, printReceived } from "jest-matcher-utils";
import predicate from "./predicate";
import { MatchersObject } from "expect/build/types";
import { option } from "fp-tk";
import { foldMatcher } from "../../utils/fold-matcher.util";

const passMessage = (received) => () =>
  `${matcherHint(".not.toBeNone", "received", "")}

  Expected value to be some received:
    ${printReceived(received)}
`;
// const passMessage = (received) => () =>
//   matcherHint(".not.toBeTrue", "received", "") +
//   "\n\n" +
//   "Expected value to not be true received:\n" +
//   `  ${printReceived(received)}`;

const failMessage = (received) => () =>
  ` ${matcherHint(".toBeNone", "received", "")}

    Expected value to be none:
      ${printExpected(option.none)}
    Received:
      ${printReceived(received)}`;

// const failMessage = (received) => () =>
//   matcherHint(".toBeTrue", "received", "") +
//   "\n\n" +
//   "Expected value to be true:\n" +
//   `  ${printExpected(true)}\n` +
//   "Received:\n" +
//   `  ${printReceived(received)}`;

export default {
  toBeNone: foldMatcher(predicate, {
    onFail: failMessage,
    onPass: passMessage,
  }),
} as MatchersObject;
