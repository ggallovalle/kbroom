import { codec, decoder, either, pipe } from "fp-tk";
import { parseExpression } from "cron-parser";
import { Cron } from "./cron.iso";

export const CronCodec: codec.Codec<unknown, string, Cron> = codec.make(
  pipe(
    decoder.string,
    decoder.parse((val) => {
      return pipe(
        either.tryCatch(
          () => parseExpression(val),
          (reason) => reason.toString()
        ),
        either.fold(
          (reason) => decoder.failure(val, reason.toString()),
          () => decoder.success(Cron.wrap(val))
        )
      );
    })
  ),
  {
    encode: (val) => Cron.unwrap(val),
  }
);
