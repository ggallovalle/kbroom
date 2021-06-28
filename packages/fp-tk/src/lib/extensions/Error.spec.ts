import { thrower } from "./Error";

describe("thrower", () => {
  it("should throw error", () => {
    // Assert
    expect(() => thrower(Error)()).toThrow();
  });

  it("should throw with specified error instance", () => {
    // Assert
    expect(() => thrower(TypeError)()).toThrow(TypeError);
  });

  it("should throw with specified message", () => {
    // Assert
    expect(() => thrower(Error)("some message")).toThrow("some message");
  });
});
