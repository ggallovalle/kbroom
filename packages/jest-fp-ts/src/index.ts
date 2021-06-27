import matchers from "./lib/matchers";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const jestExpect = (global as any).expect;

declare global {
  namespace jest {
    interface Matchers<R> {
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
