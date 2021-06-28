import { constFalse, not, pipe, Predicate } from "fp-ts/function";
import { boolean, option, string } from "fp-ts";

/**
 * Returns `None` if number is negative, `Some` otherwise.
 *
 * @example
 * import { option as _ } from 'fp-tk'
 *
 * expect(_.emptyStringToNone(_.negativeToNone(-1))).toEqual(_.none)
 * expect(_.emptyStringToNone(_.negativeToNone(1))).toEqual(_.some(1))
 * @since 2.1.0
 */
export const negativeToNone: (
  a: number
) => option.Option<number> = option.fromPredicate((n: number) => n > 0);

/**
 * Returns `None` if number is NaN, `Some` otherwise.
 *
 * @example
 * import { option as _ } from 'fp-tk'
 *
 * expect(_.emptyStringToNone(_.NaNToNone(NaN))).toEqual(_.none)
 * expect(_.emptyStringToNone(_.NaNToNone(1))).toEqual(_.some(1))
 * @since 2.1.0
 */
export const NaNToNone: (
  a: number
) => option.Option<number> = option.fromPredicate(not(isNaN));

/**
 * Returns `None` if the string is "", `Some` otherwise.
 *
 * @example
 * import { option as _ } from 'fp-tk'
 *
 * expect(_.emptyStringToNone(_.emptyStringToNone(""))).toEqual(_.none)
 * expect(_.emptyStringToNone(_.emptyStringToNone("hello"))).toEqual(_.some("hello"))
 * @since 2.1.0
 */
export const emptyStringToNone: (
  a: string
) => option.Option<string> = option.fromPredicate(not(string.isEmpty));

const _makeSafe = (predicate: Predicate<option.Option<unknown>>) => (
  a: unknown
): boolean =>
  pipe(
    // null == undefined, null is typeof object, so strict equality doesn't work
    a == null,
    boolean.fold(() => predicate(a as option.Option<unknown>), constFalse)
  );

/**
 * Returns `true` if the option is an instance of `Some`, `false` otherwise.
 *
 * @example
 * import { option as _ } from 'fp-tk'
 *
 * expect(_.isSafeSome(_.some(1))).toEqual(true)
 * expect(_.isSafeSome(1)).toEqual(true)
 * expect(_.isSafeSome(_.none)).toEqual(true)
 *
 * @since 2.1.0
 */
export const safeIsSome: (a: unknown) => boolean = _makeSafe(option.isSome);

/**
 * Returns `true` if the option is an instance of `Some`, `false` otherwise.
 *
 * @example
 * import { option as _ } from 'fp-tk'
 *
 * expect(_.safeIsNone(_.none)).toEqual(true)
 * expect(_.safeIsNone(_.some(1))).toEqual(false)
 * expect(_.safeIsNone(1)).toEqual(false)
 *
 * @since 2.1.0
 */
export const safeIsNone: (a: unknown) => boolean = _makeSafe(option.isSome);

export * from "fp-ts/Option";
