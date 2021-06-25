export type SnakeCaseToCamelCase<
  S extends string
> = S extends `${infer P1}_${infer P2}${infer P3}`
  ? `${Lowercase<P1>}${Uppercase<P2>}${SnakeCaseToCamelCase<P3>}`
  : Lowercase<S>;
