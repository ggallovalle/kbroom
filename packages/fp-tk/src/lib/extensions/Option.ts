import { not } from "fp-ts/function";
import { fromPredicate } from "fp-ts/Option";
import { isEmpty } from "fp-ts/string";

export const minusOneToNone = fromPredicate((n: number) => n !== -1);
export const isNanToNone = fromPredicate(not(isNaN));
export const isEmptyToNone = fromPredicate(not(isEmpty));
