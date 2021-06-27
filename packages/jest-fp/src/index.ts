import matchers from "./lib/matchers";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const jestExpect = (global as any).expect;

if (jestExpect !== undefined) {
  jestExpect.extend(matchers);
} else {
  /* eslint-disable no-console */
  console.error(
    "Unable to find Jest's global expect." +
      "\nPlease check you have added jest-extended correctly to your jest configuration."
  );
  /* eslint-enable no-console */
}
