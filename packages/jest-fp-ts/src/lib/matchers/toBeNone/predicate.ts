import { boolean, func, option, pipe, Predicate, record } from "fp-tk";

export const predicate: Predicate<unknown> = option.isNone;
export const isNotPredicate: Predicate<unknown> = option.isSome;

const onSome = (value: unknown, f: Predicate<option.Some<unknown>>): boolean =>
  pipe(
    option.safeIsSome(value),
    boolean.fold(func.constFalse, () =>
      // received is some
      pipe(value, option.fold(func.constFalse, f))
    )
  );

export const isNotPredicateExpected = (
  received: unknown,
  expected: unknown
): boolean =>
  pipe(
    onSome(received, (received) =>
      pipe(
        received === expected,
        boolean.fold(
          () => onSome(expected, (expected) => received === expected),
          func.constTrue
        )
      )
    )
  );
