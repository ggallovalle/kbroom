import { boolean, decoder, pipe, codec } from "fp-tk";
import { EmailAddress } from "./email.iso";

export const EmailCodec = codec.make(
  pipe(
    decoder.string,
    decoder.parse((val) => {
      const EMAIL_ADDRESS_REGEX = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
      return pipe(
        EMAIL_ADDRESS_REGEX.test(val),
        boolean.fold(
          () => decoder.failure(val, `it isn't a valid email address ${val}`),
          () => decoder.success(EmailAddress.wrap(val))
        )
      );
    })
  ),
  {
    encode: EmailAddress.unwrap,
  }
);
