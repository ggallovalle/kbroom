import { iso, prism, Newtype } from "newtype-ts";
import { Char, isChar, prismChar } from "newtype-ts/lib/Char";
import { Integer, isInteger, prismInteger } from "newtype-ts/lib/Integer";
import { Negative, isNegative, prismNegative } from "newtype-ts/lib/Negative";
import {
  NegativeInteger,
  isNegativeInteger,
  prismNegativeInteger,
} from "newtype-ts/lib/NegativeInteger";
import {
  NonEmptyString,
  isNonEmptyString,
  prismNonEmptyString,
} from "newtype-ts/lib/NonEmptyString";
import {
  NonNegative,
  isNonNegative,
  prismNonNegative,
} from "newtype-ts/lib/NonNegative";
import {
  NonNegativeInteger,
  isNonNegativeInteger,
  prismNonNegativeInteger,
} from "newtype-ts/lib/NonNegativeInteger";
import {
  NonPositive,
  isNonPositive,
  prismNonPositive,
} from "newtype-ts/lib/NonPositive";
import {
  NonPositiveInteger,
  isNonPositiveInteger,
  prismNonPositiveInteger,
} from "newtype-ts/lib/NonPositiveInteger";
import { NonZero, isNonZero, prismNonZero } from "newtype-ts/lib/NonZero";
import {
  NonZeroInteger,
  isNonZeroInteger,
  prismNonZeroInteger,
} from "newtype-ts/lib/NonZeroInteger";
import { Positive, isPositive, prismPositive } from "newtype-ts/lib/Positive";
import {
  PositiveInteger,
  isPositiveInteger,
  prismPositiveInteger,
} from "newtype-ts/lib/PositiveInteger";

export {
  //#region  based
  iso,
  prism,
  Newtype,
  //#endregion
  Char,
  isChar,
  prismChar,
  Integer,
  isInteger,
  prismInteger,
  Negative,
  isNegative,
  prismNegative,
  NegativeInteger,
  isNegativeInteger,
  prismNegativeInteger,
  NonEmptyString,
  isNonEmptyString,
  prismNonEmptyString,
  NonNegative,
  isNonNegative,
  prismNonNegative,
  NonNegativeInteger,
  isNonNegativeInteger,
  prismNonNegativeInteger,
  NonPositive,
  isNonPositive,
  prismNonPositive,
  NonPositiveInteger,
  isNonPositiveInteger,
  prismNonPositiveInteger,
  NonZero,
  isNonZero,
  prismNonZero,
  NonZeroInteger,
  isNonZeroInteger,
  prismNonZeroInteger,
  Positive,
  isPositive,
  prismPositive,
  PositiveInteger,
  isPositiveInteger,
  prismPositiveInteger,
};
