import { BCRYPT_REGEX } from "./encrypted.codec";

export const isEncrypted: (data: string) => boolean = (data) =>
  BCRYPT_REGEX.test(data);
