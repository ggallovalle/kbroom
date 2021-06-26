import { either, flow } from "fp-tk";
import { constFalse, constTrue } from "fp-ts/lib/function";
import { CronCodec } from "./cron.codec";

export const isCron: (value: unknown) => boolean = flow(
  CronCodec.decode,
  either.fold(constFalse, constTrue)
);
