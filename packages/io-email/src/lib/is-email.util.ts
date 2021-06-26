import { either, flow } from "fp-tk";
import { constFalse, constTrue } from "fp-ts/lib/function";
import { EmailCodec } from "./email.codec";

export const isEmail: (value: unknown) => boolean = flow(
  EmailCodec.decode,
  either.fold(constFalse, constTrue)
);
