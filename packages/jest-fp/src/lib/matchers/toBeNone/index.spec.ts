import { option } from "fp-tk";
import matcher from "./";

expect.extend(matcher);

describe(".toBeNone", () => {
  it("should pass when given none", () => {
    // @ts-expect-error toBeNone isn't added to typescript types
    expect(option.none).toBeNone();
    //- @ts-expect-error toBeNone isn't added to typescript types
    // expect("hola").toBeNone();
  });

  it.skip("should failed when given something that isn't none", () => {
    // @ts-expect-error toBeNone isn't added to typescript types
    expect(() => expect(true).toBeNone()).toThrowErrorMatchingSnapshot();
  });
});
// describe(".toBeTrue", () => {
//   test("passes when given true", () => {
//     expect(true).toBeTrue();
//   });

//   test("fails when not given true", () => {
//     expect(() => expect(false).toBeTrue()).toThrowErrorMatchingSnapshot();
//   });
// });

// describe(".not.toBeTrue", () => {
//   each([
//     [false],
//     [""],
//     [0],
//     [{}],
//     [[]],
//     [() => {}],
//     [undefined],
//     [null],
//     [NaN],
//   ]).test("passes when not given true: %s", (given) => {
//     expect(given).not.toBeTrue();
//   });

//   test("fails when given true", () => {
//     expect(() => expect(true).not.toBeTrue()).toThrowErrorMatchingSnapshot();
//   });
// });
