import {
  matcherHint,
  MatcherHintOptions,
  printDiffOrStringify,
  printReceived,
} from "jest-matcher-utils";

const EXPECTED_LABEL = "Expected";
const RECEIVED_LABEL = "Received";

export const SHOULD_NEVER_HAPPEN =
  "Should Never Happen, isNot is being handled differently";

export const printer = (
  matcherName: string,
  received: unknown,
  expected: unknown,
  options: MatcherHintOptions,
  expand: unknown
) =>
  matcherHint(
    matcherName,
    printReceived(received),
    printReceived(expected),
    options
  ) +
  "\n\n" +
  printDiffOrStringify(
    expected,
    received,
    EXPECTED_LABEL,
    RECEIVED_LABEL,
    expand !== false
  );
