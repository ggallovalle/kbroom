module.exports = {
  displayName: "fp-tk",
  preset: "../../jest.preset.js",
 "setupFilesAfterEnv": ["jest-extended"],
  globals: {
    "ts-jest": {
      tsconfig: "<rootDir>/tsconfig.spec.json",
    },
  },
  testEnvironment: "node",
  transform: {
    "^.+\\.[tj]sx?$": "ts-jest",
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
  coverageDirectory: "../../coverage/packages/fp-tk",
};
