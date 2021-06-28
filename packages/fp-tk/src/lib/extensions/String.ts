import { fold } from "fp-ts/boolean";
import { flow, pipe } from "fp-ts/function";
import { fromNullable, Option } from "fp-ts/Option";
import {
  empty,
  Eq,
  isEmpty,
  Monoid,
  Ord,
  Semigroup,
  Show,
  size,
} from "fp-ts/string";
import { emptyStringToNone, NaNToNone, negativeToNone } from "./Option";
import {
  PositiveInteger,
  prismPositiveInteger,
} from "newtype-ts/lib/PositiveInteger";
import { option } from "fp-ts";

/**
 * Calls `toString()` on object
 * @param obj any object
 */
export const toString = <T extends { toString: () => string }>(obj: T) =>
  obj.toString();

/**
 * Returns the character at the specified index.
 * @param index The zero-based index of the desired character.
 */
export const charAt = (index: number) => (str: string): Option<string> =>
  pipe(str.charAt(index), flow(emptyStringToNone));

/**
 * Returns the Unicode value of the character at the specified location.
 * @param index The zero-based index of the desired character. If there is no character at the specified index, NaN is returned.
 */
export const charCodeAt = (index: number) => (str: string): Option<number> =>
  pipe(str.charCodeAt(index), NaNToNone);

/**
 * Returns a string that contains the concatenation of two or more strings.
 * @param str The strings to append to the end of the string.
 */
export const concat = (str: string) => (str2: string): string =>
  str.concat(str2);

/**
 * Returns the last occurrence of a substring in the string.
 * @param searchString The substring to search for.
 * @param position The index at which to begin searching. If omitted, the search begins at the end of the string.
 */
export const indexOf = (searchString: string, position?: number) => (
  str: string
): Option<number> => pipe(str.indexOf(searchString, position), negativeToNone);

/**
 * Returns the last occurrence of a substring in the string.
 * @param searchString The substring to search for.
 * @param position The index at which to begin searching. If omitted, the search begins at the end of the string.
 */
export const lastIndexOf = (searchString: string, position?: number) => (
  str: string
): Option<number> =>
  pipe(str.lastIndexOf(searchString, position), negativeToNone);

/**
 * Determines whether two strings are equivalent in the current or specified locale.
 * @param str String to compare to target string
 * @param locales A locale string or array of locale strings that contain one or more language or locale tags. If you include more than one locale string, list them in descending order of priority so that the first entry is the preferred locale. If you omit this parameter, the default locale of the JavaScript runtime is used. This parameter must conform to BCP 47 standards; see the Intl.Collator object for details.
 * @param options An object that contains one or more properties that specify comparison options. see the Intl.Collator object for details.
 */
export const localeCompare = (
  str: string,
  locales?: string | Array<string>,
  options?: Intl.CollatorOptions
) => (str2: string): "before" | "after" | "eq" =>
  pipe(str2.localeCompare(str, locales, options), (n) =>
    n === 0 ? "eq" : n < 0 ? "before" : "after"
  );

/**
 * Matches a string with a regular expression, and returns an array containing the results of that search.
 * @param regexp A variable name or string literal containing the regular expression pattern and flags.
 */
export const match = (regexp: string | RegExp) => (
  str: string
): Option<RegExpMatchArray> => pipe(str.match(regexp), fromNullable);

/**
 * Replaces text in a string, using a regular expression or search string.
 * @param replaceValue A function that returns the replacement text. Or a string containing the text to replace for every successful match of searchValue in this string.
 */
export const replace = (
  replaceValue: ((substring: string, ...args: unknown[]) => string) | string
) => (searchValue: string | RegExp) => (str: string): string =>
  pipe(
    typeof replaceValue === "string",
    fold(
      () => str.replace(searchValue, replaceValue as string),
      () =>
        str.replace(
          searchValue,
          replaceValue as (subsString: string, ...args: unknown[]) => string
        )
    )
  );

/**
 * Finds the first substring match in a regular expression search.
 * @param regexp The regular expression pattern and applicable flags.
 */
export const search = (regexp: string | RegExp) => (
  str: string
): Option<number> => pipe(str.search(regexp), negativeToNone);

/**
 * Returns a section of a string.
 * @param start The index to the beginning of the specified portion of stringObj.
 * @param end The index to the end of the specified portion of stringObj. The substring includes the characters up to, but not including, the character indicated by end.
 * If this value is not specified, the substring continues to the end of stringObj.
 */
export const slice = (start?: number, end?: number) => (str: string): string =>
  str.slice(start, end);

/**
 * Split a string into substrings using the specified separator and return them as an array.
 * @param separator A string that identifies character or characters to use in separating the string. If omitted, a single-element array containing the entire string is returned.
 * @param limit A value used to limit the number of elements returned in the array.
 */
export const split = (separator: string | RegExp, limit?: number) => (
  str: string
): string[] => str.split(separator, limit);

/**
 * Returns the substring at the specified location within a String object.
 * @param start The zero-based index number indicating the beginning of the substring.
 * @param end Zero-based index number indicating the end of the substring. The substring includes the characters up to, but not including, the character indicated by end.
 * If end is omitted, the characters from start through the end of the original string are returned.
 */
export const subsstring = (start: number, end?: number) => (
  str: string
): Option<string> => pipe(str.substring(start, end), emptyStringToNone);

/** Converts all the alphabetic characters in a string to lowercase. */
export const toLowerCase = (str: string): string => str.toLocaleLowerCase();

/** Converts all the alphabetic characters in a string to uppercase. */
export const toUpperCase = (str: string): string => str.toUpperCase();

/** Removes the leading and trailing white space and line terminator characters from a string. */
export const trim = (str: string): string => str.trim();

/** Returns the length of a String object. */
export const length = (str: string): number => str.length;

/**
 * Gets a substring beginning at the specified location and having the specified length.
 * @param from The starting position of the desired substring. The index of the first character in the string is zero.
 * @param length The number of characters to include in the returned substring.
 */
export const substr = (from: number, length?: number) => (
  str: string
): string => str.substr(from, length);

/**
 * Returns true if the sequence of elements of searchString converted to a String is the
 * same as the corresponding elements of this object (converted to a String) starting at
 * position. Otherwise returns false.
 */
export const startsWith = (searchString: string, position?: number) => (
  str: string
): boolean => str.startsWith(searchString, position);

/**
 * Returns true if searchString appears as a substring of the result of converting this
 * object to a String, at one or more positions that are
 * greater than or equal to position; otherwise, returns false.
 * @param searchString search string
 * @param position If position is undefined, 0 is assumed, so as to search all of the String.
 */
export const includes = (searchString: string, position?: number) => (
  str: string
): boolean => str.includes(searchString, position);

/**
 * Returns true if the sequence of elements of searchString converted to a String is the
 * same as the corresponding elements of this object (converted to a String) starting at
 * endPosition – length(this). Otherwise returns false.
 */
export const endsWith = (searchString: string, endPosition?: number) => (
  str: string
) => str.endsWith(searchString, endPosition);

/**
 * Returns a String value that is made from count copies appended together. If count is 0,
 * the empty string is returned.
 * @param count number of copies to append
 */
export const repeat = (count: number) => (str: string): Option<string> =>
  pipe(
    prismPositiveInteger.getOption(count),
    option.map(() => str.repeat(count))
  );

export { empty, isEmpty, size, Eq, Monoid, Ord, Semigroup, Show };
