import { RuntimeException } from "@nestjs/core/errors/exceptions/runtime.exception";

export class HostNotHandledException extends RuntimeException {
  constructor(message) {
    super(message);
  }
}
