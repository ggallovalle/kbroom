import { Constructor } from "@kbroom/magical-types";
/**
 * Throw Instance of Error
 * @param klass Error class to be thrown
 * @returns void
 */
export const thrower = <T extends Constructor<Error>>(klass: T) => (
  msg: any
): never => {
  throw new klass(msg);
};
