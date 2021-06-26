import { none, some, isNone, isSome } from "fp-ts/lib/Option";
import { isEmptyToNone, isNanToNone, minusOneToNone } from "./Option";
describe("Option extensions", () => {
  describe("minusOneToNone", () => {
    it("should be `none` when -1", () => {
      // Arrange
      const minusOne = -1;
      const expected = none;
      // Act
      const actual = minusOneToNone(minusOne);
      // Assert
      expect(isNone(actual)).toBeTrue();
    });

    it("should be `some` when different than -1", () => {
      // Arrange
      const one = 1;
      const whant = some(one);
      // Act
      const actual = minusOneToNone(one);
      // Assert
      expect(actual).toEqual(whant);
    });
  });

  describe("isNanToNone", () => {
    it("should be `none` when NaN", () => {
      // Arrange
      const notANumber = NaN;
      const whant = none;
      // Act
      const actual = isNanToNone(notANumber);
      // Assert
      expect(actual).toBe(whant);
    });

    it("should be `some` when a number", () => {
      // Arrange
      const someNumber = 1;
      const whant = some(someNumber);
      // Act
      const actual = isNanToNone(someNumber);
      // Assert
      expect(actual).toEqual(whant);
    });
  });

  describe("isEmptyToNone", () => {
    it("should be `none` when empty string", () => {
      // Arrange
      const emptyString = "";
      const whant = none;
      // Act
      const actual = isEmptyToNone(emptyString);
      // Assert
      expect(actual).toBe(whant);
    });

    it("should be `some` when a non empty string", () => {
      // Arrange
      const nonEmptyString = "hello";
      const whant = some(nonEmptyString);
      // Act
      const actual = isEmptyToNone(nonEmptyString);
      // Assert
      expect(actual).toEqual(whant);
    });
  });
});
