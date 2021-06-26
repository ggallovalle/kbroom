import { compareSync, hashSync } from "bcrypt";
import { codec, decoder, pipe } from "fp-tk";
import { Encrypted } from "./encrypted.iso";

// @see https://stackoverflow.com/a/32190124
// @see https://regex101.com/r/jD7aL3/1
const BCRYPT_REGEX = /^\$2[ayb]\$.{56}$/;
export const EncryptedCodec = codec.make(
  pipe(
    decoder.string,
    decoder.parse((val) => {
      if (BCRYPT_REGEX.test(val)) {
        return pipe(val, Encrypted.wrap, decoder.success);
      } else {
        return pipe(hashSync(val, 10), Encrypted.wrap, decoder.success);
      }
    })
  ),
  {
    encode: Encrypted.unwrap,
  }
);

export const isEncryptedTheSame = (
  data: string,
  encrypted: Encrypted
): boolean => compareSync(data, Encrypted.unwrap(encrypted));
