import type { SnakeCaseToCamelCase } from "./string";

export type RecordSnakeCaseToCamelCase<T> = {
  [K in keyof T as SnakeCaseToCamelCase<string & K>]: T[K] extends Array<
    infer U
  >
    ? U extends Record<string, unknown>
      ? Array<RecordSnakeCaseToCamelCase<U>>
      : T[K]
    : T[K] extends Record<string, unknown>
    ? RecordSnakeCaseToCamelCase<T[K]>
    : T[K];
};
