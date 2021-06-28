import { codec, constant, decoder, either, pipe } from "fp-tk";
import { parseExpression } from "cron-parser";
import { Cron } from "./cron.iso";

export const CronCodec: codec.Codec<unknown, string, Cron> = codec.make(
  pipe(
    decoder.string,
    decoder.parse((val) =>
      pipe(
        either.tryCatch(constant(parseExpression(val)), (reason) =>
          reason.toString()
        ),
        either.fold(
          (reason) => decoder.failure(val, reason.toString()),
          constant(decoder.success(Cron.wrap(val)))
        )
      )
    )
  ),
  {
    encode: Cron.unwrap,
  }
);
