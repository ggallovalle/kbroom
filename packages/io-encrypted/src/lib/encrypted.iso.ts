import { nt } from "fp-tk";

export type Encrypted = nt.Newtype<
  { readonly Encrypted: unique symbol },
  string
>;

export const Encrypted = nt.iso<Encrypted>();
