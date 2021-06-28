import { Constructor } from "@kbroom/magical-types";
/**
 * Throw Instance of Error
 * @param klass Error class to be thrown
 *
 * @example
 * import { thrower } from "fp-tk";
 *
 * expect(() => thrower(Error)()).toThrow();
 * expect(() => thrower(TypeError)()).toThrow(TypeError);
 * expect(() => thrower(Error)("some message")).toThrow("some message");
 *
 */
export const thrower = <T extends Constructor<Error>>(klass: T) => (
  ...msg: any
): never => {
  throw new klass(...msg);
};
