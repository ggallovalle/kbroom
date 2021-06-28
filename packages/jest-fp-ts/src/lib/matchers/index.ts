import toBeDone from "./toBeNone";

const imports = [toBeDone];

export default imports.reduce((acc, matcher) => ({ ...acc, ...matcher }), {});
