import matchers from "./lib/matchers";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const jestExpect = (global as any).expect;

declare global {
  namespace jest {
    interface Matchers<R> {
      /**
       * Check if received is None.
       *
       * **.not** - check if expected is `some` either wrapped or unwrapped
       * @example
       * import {option} from "fp-ts"
       *
       *  expect(option.none).toBeNone();
       *  expect(option.some(1).not.toBeNone()
       *  expect(option.some(1).not.toBeNone(1)
       *  expect(option.some(1).not.toBeNone(some(1))
       */
      toBeNone(expected?: unknown): R;
    }
  }
}

if (jestExpect !== undefined) {
  jestExpect.extend(matchers);
} else {
  /* eslint-disable no-console */
  console.error(
    "Unable to find Jest's global expect." +
      "\nPlease check you have added jest-fp-ts correctly to your jest configuration."
  );
  /* eslint-enable no-console */
}
