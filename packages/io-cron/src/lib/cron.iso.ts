import { nt } from "fp-tk";

export type Cron = nt.Newtype<{ readonly Cron: unique symbol }, string>;

export const Cron = nt.iso<Cron>();
