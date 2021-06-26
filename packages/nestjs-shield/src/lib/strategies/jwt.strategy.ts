import { ExtractJwt, Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { Inject } from "@nestjs/common";
import { SHIELD_PASSPORT_JWT_OPTIONS } from "../shield.constants";
import { JWTStrategyOptions } from "../interfaces/shield-options.interface";

export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(SHIELD_PASSPORT_JWT_OPTIONS)
    private readonly _options: JWTStrategyOptions,
  ) {
    super({
      ..._options,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  validate(payload: unknown) {
    return payload;
  }
}
