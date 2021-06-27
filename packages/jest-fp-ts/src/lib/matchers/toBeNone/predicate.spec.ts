import { option } from "fp-tk";

import { predicate } from "./predicate";
const cases = [
  [option.none, true],
  [true, false],
  [[], false],
  [option.some(1), false],
  [option.some("yes"), false],
  [option.some({ hello: "world" }), false],
];

describe("toBeNone predicate", () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  it.each(cases)("when %s should be %s", (actual: any, want: any) => {
    expect(predicate(actual)).toBe(want);
  });
});
