import { boolean, decoder, nt, pipe } from "fp-tk";

export type EmailAddress = nt.Newtype<
  { readonly EmailAddress: unique symbol },
  string
>;

export const EmailAddress = nt.iso<EmailAddress>();
