import { compareSync } from "bcrypt";
import { Encrypted } from "./encrypted.iso";

export const isEncryptedEq: (
  data: string
) => (encrypted: Encrypted) => boolean = (data) => (encrypted) =>
  compareSync(data, Encrypted.unwrap(encrypted));
