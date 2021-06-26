import { nt } from "fp-tk";

export type Email = nt.Newtype<
  { readonly EmailAddress: unique symbol },
  string
>;

export const Email = nt.iso<Email>();
