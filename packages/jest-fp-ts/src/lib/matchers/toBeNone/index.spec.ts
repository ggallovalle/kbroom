import { option } from "fp-tk";
import matcher from "./";

expect.extend(matcher);

const matcherName = ".toBeNone";
describe(matcherName, () => {
  it("should pass when received `none`", () => {
    expect(option.none).toBeNone();
  });

  it("should throw when received something that isn't `none`", () => {
    expect(() => expect(true).toBeNone()).toThrow();
  });

  it("should throw if passed expected", () => {
    expect(() => expect(true).toBeNone(10)).toThrow();
  });

  describe(`.not${matcherName}`, () => {
    it("should pass when received `some`", () => {
      expect(option.some(1)).not.toBeNone();
    });

    it("should throw when received is not `some`", () => {
      expect(() => expect(1).not.toBeNone()).toThrow();
    });

    it("should throw when received is `none`", () => {
      expect(() => expect(option.none).not.toBeNone()).toThrow();
    });

    it("should pass when received `some` same value in both sides", () => {
      expect(option.some(1)).not.toBeNone(option.some(1));
    });

    it("should pass when received `some` and the unwrapped value of such `some` in expected", () => {
      expect(option.some(1)).not.toBeNone(1);
    });

    it("should throw when received `some` is different than expected `some`", () => {
      expect(() =>
        expect(option.some(1)).not.toBeNone(option.some(10))
      ).toThrow();
    });

    it("should throw when received and unwrapped expected `some` are different", () => {
      expect(() => expect(option.some(1)).not.toBeNone(10)).toThrow();
    });
  });
});
