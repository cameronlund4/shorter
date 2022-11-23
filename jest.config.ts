/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/configuration
 */

export default {
  testMatch: [
    // "**/__tests__/**/*.[jt]s?(x)",
    "**/?(*.)+(uspec|ispec).[tj]s?(x)",
  ],
  preset: "ts-jest",
  testEnvironment: "node",
};
