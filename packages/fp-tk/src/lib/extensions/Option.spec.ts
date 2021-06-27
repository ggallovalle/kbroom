import * as _ from "./Option";

describe("Option extensions", () => {
  describe("negativeToNone", () => {
    it("should be `none` when -1", () => {
      // Act
      const actual = _.negativeToNone(-1);
      // Assert
      expect(actual).toEqual(_.none);
    });

    it("should be `some` when different than -1", () => {
      // Arrange
      const one = 1;
      const expected = _.some(one);
      // Act
      const actual = _.negativeToNone(one);
      // Assert
      expect(actual).toEqual(expected);
    });
  });

  describe("NaNToNone", () => {
    it("should be `none` when NaN", () => {
      // Act
      const actual = _.NaNToNone(NaN);
      // Assert
      expect(actual).toBe(_.none);
    });

    it("should be `some` when a number", () => {
      // Arrange
      const someNumber = 1;
      const expected = _.some(someNumber);
      // Act
      const actual = _.NaNToNone(someNumber);
      // Assert
      expect(actual).toEqual(expected);
    });
  });

  describe("emptyStringToNone", () => {
    it("should be `none` when empty string", () => {
      // Act
      const actual = _.emptyStringToNone("");
      // Assert
      expect(actual).toBe(_.none);
    });

    it("should be `some` when a non empty string", () => {
      // Arrange
      const nonEmptyString = "hello";
      const expected = _.some(nonEmptyString);
      // Act
      const actual = _.emptyStringToNone(nonEmptyString);
      // Assert
      expect(actual).toEqual(expected);
    });
  });

  describe("safeIsSome", () => {
    it("should throw if actual is `undefined` in unsafe isSome", () => {
      // Arrange
      const actual = () =>
        _.isSome((undefined as unknown) as _.Option<unknown>);
      // Assert
      expect(actual).toThrow();
    });

    it("should throw if actual is `null` in unsafe isSome", () => {
      // Arrange
      const actual = () => _.isSome((null as unknown) as _.Option<unknown>);
      // Assert
      expect(actual).toThrow();
    });

    it("should be false if actual is `undefined` in safeIsSome", () => {
      // Arrange
      const actual = _.safeIsSome(undefined);
      // Assert
      expect(actual).toBeFalse();
    });

    it("should be false if actual is `null` in safeIsSome", () => {
      // Arrange
      const actual = _.safeIsSome(null);
      // Assert
      expect(actual).toBeFalse();
    });
  });

  describe("safeIsNone", () => {
    it("should throw if actual is `undefined` in unsafe isNone", () => {
      // Arrange
      const actual = () =>
        _.isNone((undefined as unknown) as _.Option<unknown>);
      // Assert
      expect(actual).toThrow();
    });

    it("should throw if actual is `null` in unsafe isNone", () => {
      // Arrange
      const actual = () => _.isNone((null as unknown) as _.Option<unknown>);
      // Assert
      expect(actual).toThrow();
    });

    it("should be false if actual is `undefined` in safeIsNone", () => {
      // Arrange
      const actual = _.safeIsNone(undefined);
      expect(actual).toBeFalse();
    });

    it("should be false if actual is `null` in safeIsNone", () => {
      // Arrange
      const actual = _.safeIsNone(null);
      // Assert
      expect(actual).toBeFalse();
    });
  });
});
